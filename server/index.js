import { createServer } from 'node:http'
import { createReadStream, mkdirSync, writeFileSync, unlinkSync, existsSync, statSync } from 'node:fs'
import { extname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'

const root = fileURLToPath(new URL('../', import.meta.url))
const buildDir = join(root, 'dist')
const dataDir = process.env.SOS_DATA_DIR || join(root, 'data')
const uploadDir = join(dataDir, 'photos')
mkdirSync(uploadDir, { recursive: true })
const db = new DatabaseSync(join(dataDir, 'sos.sqlite'))
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    animal TEXT NOT NULL, city TEXT NOT NULL, street TEXT NOT NULL, landmark TEXT NOT NULL DEFAULT '',
    latitude REAL, longitude REAL, occurred_at TEXT NOT NULL, condition TEXT NOT NULL,
    description TEXT NOT NULL, contact TEXT NOT NULL DEFAULT '', consent INTEGER NOT NULL,
    photo_name TEXT, photo_type TEXT, created_at TEXT NOT NULL, status TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS status_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
    status TEXT NOT NULL, changed_at TEXT NOT NULL
  );
`)

const statuses = ['help_needed', 'volunteer_dispatched', 'clinic', 'resolved']
const animals = ['dog', 'cat', 'other']
const conditions = ['conscious', 'not-moving', 'bleeding', 'unknown']
const photoTypes = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' }
const now = () => new Date().toISOString()

function send(res, code, value) {
  res.writeHead(code, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
  res.end(JSON.stringify(value))
}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function serveFrontend(req, res, pathname) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return false

  let decodedPath
  try { decodedPath = decodeURIComponent(pathname) } catch {
    res.writeHead(400).end('Bad request')
    return true
  }

  const requestedPath = resolve(buildDir, `.${decodedPath}`)
  if (requestedPath !== buildDir && !requestedPath.startsWith(`${buildDir}${sep}`)) {
    res.writeHead(403).end('Forbidden')
    return true
  }

  let filePath = requestedPath
  if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = join(filePath, 'index.html')
  if (!existsSync(filePath) && !extname(decodedPath)) filePath = join(buildDir, 'index.html')
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404).end('Not found')
    return true
  }

  res.writeHead(200, {
    'content-type': contentTypes[extname(filePath).toLowerCase()] || 'application/octet-stream',
    'x-content-type-options': 'nosniff',
  })
  if (req.method === 'HEAD') res.end()
  else createReadStream(filePath).pipe(res)
  return true
}

async function readJson(req) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > 8_000_000) throw Object.assign(new Error('Request is too large.'), { status: 413 })
    chunks.push(chunk)
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}') } catch { throw Object.assign(new Error('Invalid JSON.'), { status: 400 }) }
}

function validate(data) {
  const required = ['animal', 'city', 'street', 'occurredAt', 'condition', 'description']
  for (const key of required) if (typeof data[key] !== 'string' || !data[key].trim()) throw Object.assign(new Error(`Missing or invalid field: ${key}`), { status: 400 })
  for (const key of ['landmark', 'contact']) if (data[key] != null && typeof data[key] !== 'string') throw Object.assign(new Error(`Invalid field: ${key}`), { status: 400 })
  if (!animals.includes(data.animal)) throw Object.assign(new Error('Unsupported animal type.'), { status: 400 })
  if (!conditions.includes(data.condition)) throw Object.assign(new Error('Unsupported animal condition.'), { status: 400 })
  if (data.city.length > 160 || data.street.length > 240 || (data.landmark || '').length > 240 || data.description.length > 4000 || (data.contact || '').length > 120) throw Object.assign(new Error('One or more fields exceed the allowed length.'), { status: 400 })
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:?\d{2})?$/.test(data.occurredAt) || !Number.isFinite(Date.parse(data.occurredAt))) throw Object.assign(new Error('Invalid incident date.'), { status: 400 })
  if (data.consent !== true) throw Object.assign(new Error('Consent is required.'), { status: 400 })
  const { latitude, longitude } = data
  if ((latitude == null) !== (longitude == null) || (latitude != null && (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180))) throw Object.assign(new Error('Invalid coordinates.'), { status: 400 })
}

function parsePhoto(value) {
  if (value == null || value === '') return null
  if (typeof value !== 'string') throw Object.assign(new Error('Invalid photo data.'), { status: 400 })
  const match = value.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/]+={0,2})$/)
  if (!match) throw Object.assign(new Error('Photo must be JPEG, PNG, or WebP.'), { status: 400 })
  const buffer = Buffer.from(match[2], 'base64')
  if (buffer.toString('base64') !== match[2]) throw Object.assign(new Error('Invalid photo encoding.'), { status: 400 })
  if (buffer.length > 5 * 1024 * 1024) throw Object.assign(new Error('Photo exceeds the 5 MB limit.'), { status: 400 })
  if (buffer.length === 0) throw Object.assign(new Error('Photo file is empty.'), { status: 400 })
  const signatureValid = match[1] === 'image/jpeg'
    ? buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
    : match[1] === 'image/png'
      ? buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      : buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP'
  if (!signatureValid) throw Object.assign(new Error('Photo content does not match its file type.'), { status: 400 })
  return { type: match[1], buffer }
}

function getRequest(id) {
  const row = db.prepare('SELECT * FROM requests WHERE id = ?').get(id)
  if (!row) return null
  const history = db.prepare('SELECT status, changed_at AS changedAt FROM status_history WHERE request_id = ? ORDER BY id').all(id)
  const { id: rawId, photo_name, photo_type, ...rest } = row
  return { ...rest, id: `SOS-${String(rawId).padStart(6, '0')}`, photoUrl: photo_name ? `/api/sos/${rawId}/photo` : null, photoType: photo_type, history }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  try {
    if (req.method === 'GET' && url.pathname === '/api/health') return send(res, 200, { ok: true })
    if (req.method === 'POST' && url.pathname === '/api/sos') {
      const data = await readJson(req)
      validate(data)
      const photo = parsePhoto(data.photo)
      const created = now()
      const insert = db.prepare(`INSERT INTO requests (animal, city, street, landmark, latitude, longitude, occurred_at, condition, description, contact, consent, photo_name, photo_type, created_at, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NULL, ?, ?, ?)`)
      const result = insert.run(data.animal, data.city.trim(), data.street.trim(), (data.landmark || '').trim(), data.latitude ?? null, data.longitude ?? null, data.occurredAt, data.condition, data.description.trim(), (data.contact || '').trim(), photo?.type || null, created, statuses[0])
      const id = Number(result.lastInsertRowid)
      let photoName = null
      try {
        if (photo) {
          photoName = `${id}${photoTypes[photo.type]}`
          writeFileSync(join(uploadDir, photoName), photo.buffer, { flag: 'wx' })
          db.prepare('UPDATE requests SET photo_name = ? WHERE id = ?').run(photoName, id)
        }
        db.prepare('INSERT INTO status_history (request_id, status, changed_at) VALUES (?, ?, ?)').run(id, statuses[0], created)
      } catch (error) {
        db.prepare('DELETE FROM requests WHERE id = ?').run(id)
        if (photoName) try { unlinkSync(join(uploadDir, photoName)) } catch {}
        throw error
      }
      return send(res, 201, { request: getRequest(id) })
    }
    if (req.method === 'GET' && url.pathname === '/api/sos') {
      const rows = db.prepare('SELECT id FROM requests ORDER BY id DESC').all()
      return send(res, 200, { requests: rows.map(({ id }) => getRequest(id)) })
    }
    const photoMatch = url.pathname.match(/^\/api\/sos\/(?:SOS-)?(\d+)\/photo$/)
    if (req.method === 'GET' && photoMatch) {
      const row = db.prepare('SELECT photo_name, photo_type FROM requests WHERE id = ?').get(Number(photoMatch[1]))
      if (!row?.photo_name) return send(res, 404, { error: 'Photo not found.' })
      res.writeHead(200, { 'content-type': row.photo_type, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' })
      return createReadStream(join(uploadDir, row.photo_name)).pipe(res)
    }
    const detailMatch = url.pathname.match(/^\/api\/sos\/(?:SOS-)?(\d+)$/)
    if (detailMatch && req.method === 'GET') {
      const request = getRequest(Number(detailMatch[1]))
      return request ? send(res, 200, { request }) : send(res, 404, { error: 'Request not found.' })
    }
    if (detailMatch && req.method === 'PATCH') {
      const id = Number(detailMatch[1])
      if (!db.prepare('SELECT 1 FROM requests WHERE id = ?').get(id)) return send(res, 404, { error: 'Request not found.' })
      const { status } = await readJson(req)
      if (!statuses.includes(status)) return send(res, 400, { error: 'Unsupported status.' })
      const changed = now()
      db.prepare('UPDATE requests SET status = ? WHERE id = ?').run(status, id)
      db.prepare('INSERT INTO status_history (request_id, status, changed_at) VALUES (?, ?, ?)').run(id, status, changed)
      return send(res, 200, { request: getRequest(id) })
    }
    if (url.pathname.startsWith('/api/')) return send(res, 404, { error: 'API endpoint not found.' })
    if (serveFrontend(req, res, url.pathname)) return
    return send(res, 404, { error: 'Not found.' })
  } catch (error) {
    console.error(error)
    return send(res, error.status || 500, { error: error.status ? error.message : 'Local server could not save the request.' })
  }
})

const isRenderService = Boolean(process.env.PORT)
const port = Number(process.env.PORT || process.env.API_PORT || 3001)
const host = process.env.HOST || '0.0.0.0'
server.listen(port, host, () => console.log(`Səssizlərin səsi listening at http://${host}:${port}${isRenderService ? '' : ' (local API + built frontend)'}`))
