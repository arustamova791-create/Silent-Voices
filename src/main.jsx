import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const siteNames = { az: 'Səssizlərin səsi', ru: 'Голос безмолвных' }
const pageTitles = {
  az: 'Silent Voices — Səssizlərin səsi · Onların yanında ol',
  ru: 'Silent Voices — Голос безмолвных · Будь рядом',
}
const pageDescriptions = {
  az: 'Səssizlərin səsi — Azərbaycanda küçə heyvanlarına sevgi, qayğı və yeni bir başlanğıc.',
  ru: 'Голос безмолвных — любовь, забота и новый шанс для бездомных животных в Азербайджане.',
}
const BrandName = ({ lang }) => lang === 'az'
  ? <><span>Səssizlərin</span><b>səsi</b></>
  : <><span>Голос</span><b>безмолвных</b></>

const copy = {
  az: {
    nav: ['Haqqımızda', 'Sahibləndirmə', 'Təcili yardım', 'Könüllü ol', 'Əlaqə'],
    join: 'Bizə qoşul',
    eyebrow: 'HƏR CANIN BİR HEKAYƏSİ VAR',
    title: <>Onların səsi<br />sənin <em>ürəyindədir.</em></>,
    intro: 'Küçələrdə tək qalan heyvanlara sevgi, qayğı və yeni bir başlanğıc bəxş edirik. Onların yanında olmaq üçün böyük bir şey etmək lazım deyil.',
    primary: 'Bir həyat dəyiş', secondary: 'Hekayələrlə tanış ol',
    note: 'Kiçik bir addım, böyük bir ümid.',
    aboutKicker: 'BİZ KİMİK?', aboutTitle: 'Dəyişiklik mərhəmətlə başlayır.',
    aboutText: 'Səssizlərin səsi (Silent Voices) — Azərbaycanda küçə heyvanlarının həyatını yaxşılaşdırmaq üçün bir araya gələn könüllülərin təşəbbüsüdür. Xilas edirik, müalicə etdiririk, qayğı göstəririk və onlara sevgi dolu ailə tapırıq.',
    stat1: 'xilas edilmiş can', stat2: 'isti yuva tapıb', stat3: 'qayğıkeş könüllü', statsDemo: 'Nümayiş göstəriciləri',
    storyKicker: 'BİZİM BALACALAR', storyTitle: 'Sevgi dolu bir ev gözləyirlər.',
    storySub: 'Bəlkə də növbəti gözəl hekayə səninlə başlayacaq.',
    pets: [
      { name: 'Mişa', age: 'Təxminən 2 yaş', tag: 'Sakit və mehriban', desc: 'Bir vaxtlar parkda tək idi. İndi isti bir qucaq və öz ailəsini gözləyir.' },
      { name: 'Toplan', age: 'Təxminən 1 yaş', tag: 'Oyunsevər', desc: 'Hər kəsə quyruq bulayan bu şən oğlan sadiq dost olmağa hazırdır.' },
      { name: 'Zuzu', age: 'Təxminən 8 aylıq', tag: 'Zərif və maraqlı', desc: 'Balaca addımlarla böyük sevgi gətirəcək. Qəlbində ona yer varmı?' },
    ],
    meet: 'Onunla tanış ol',
    helpKicker: 'SƏN DƏ YANIMIZDA OL', helpTitle: 'Yaxşılıq etmək üçün<br />çox yol var.',
    helpSub: 'Hər kəs öz bacardığı şəkildə kömək edə bilər. Sənin kiçik dəstəyin onlar üçün böyük fərq yaradar.',
    helpCards: [
      ['01', 'Evinə apar', 'Bir heyvana yuva açmaq onun bütün dünyasını dəyişə bilər. Bəlkə o dünya sənin evindir?'],
      ['02', 'Könüllü ol', 'Qayğı, gəzinti, foto və ya paylaşım — vaxtının bir hissəsi belə böyük köməkdir.'],
      ['03', 'Ehtiyacları paylaş', 'Yemək, dərman və müvəqqəti sığınacaq ehtiyaclarını bizdən öyrən, imkanın qədər dəstək ol.'],
    ],
    details: 'Ətraflı öyrən', quote: 'Onlar bizə güvənməyi öyrədir.<br />Biz isə onlara tək olmadıqlarını göstəririk.',
    contactKicker: 'ƏLAQƏ SAXLA', contactTitle: 'Bir mesajın, bir həyatın başlanğıcı ola bilər.', contactText: 'Sualın var, könüllü olmaq istəyirsən, yoxsa balacalardan birinə yuva açmaq? Bizə yaz — birlikdə ən gözəl yolu taparıq.',
    email: 'Salam deyək', instagram: 'Bizi Instagram-da izlə', contactDemo: 'Nümayiş əlaqəsi', footer: 'Sevgi ilə, bütün səssiz canların yanında.', rights: '© 2026 Silent Voices · Səssizlərin səsi. Sevgi ilə hazırlanıb.',
    modalTitle: 'Birlikdə başlayaq', modalText: 'Bu səhifə nümayiş məqsədi daşıyır. Heyvanlarla tanış olmaq və cari ehtiyacları öyrənmək üçün bizə yaz.', modalClose: 'Bağla',
    emergencyKicker: 'TƏCİLİ YARDIM', emergencyTitle: 'Qəza nəticəsində xəsarət almış it və ya pişik gördün?', emergencyText: 'Məlumatı yalnız nümayiş üçün doldur. Heç nə serverə göndərilmir və şəxsi məlumatlar saxlanmır. Bu forma xilasedicilərə bildiriş göndərmir.', demoLabel: 'NÜMAYİŞ REJİMİ · REAL MÜRACİƏT GÖNDƏRİLMİR', sosTitle: 'SOS · Kömək çağırışı', animalLabel: 'Heyvanın növü', dog: 'İt', cat: 'Pişik', other: 'Digər', locationLabel: 'Hadisə yeri', cityLabel: 'Şəhər', cityPlaceholder: 'Məsələn, Bakı', streetLabel: 'Küçə', streetPlaceholder: 'Küçə və ya prospekt', landmarkLabel: 'Yaxınlıqda orientir', landmarkPlaceholder: 'Bina, dayanacaq və ya tanınan yer', geoButton: 'Yerimi müəyyən et', geoHint: 'Düyməyə basdıqda brauzer geolokasiyaya icazə istəyəcək.', geoSuccess: 'Koordinatlar əlavə edildi.', geoError: 'Məkan müəyyən edilmədi. Ünvanı əl ilə daxil edə bilərsən.', mapLink: 'Xəritədə bax', dateLabel: 'Hadisənin tarixi və vaxtı', stateLabel: 'Heyvanın vəziyyəti', conscious: 'Şüuru açıqdır', notMoving: 'Hərəkət etmir', bleeding: 'Qanaxma var', unknown: 'Naməlum', photoLabel: 'Heyvanın fotosu (istəyə bağlı)', descriptionLabel: 'Vəziyyətin təsviri', descriptionPlaceholder: 'Nə baş verdiyini və görülənləri qısa təsvir et', contactLabel: 'Əlaqə telefonun (istəyə bağlı)', contactPlaceholder: '+994 __ ___ __ __', consentText: 'Əlaqə məlumatlarımın yalnız bu nümayiş formasında emal edilməsinə razıyam. Məlumatlar göndərilmir və saxlanmır.', sendDemo: 'SOS · Kömək çağırışı', formDone: 'Müraciət xilasedicilərə GÖNDƏRİLMƏDİ. Bu forma nümayiş rejimində işləyir, real kömək çağırışı deyil və məlumatları saxlamır.', fileHint: 'Foto yalnız bu səhifədə, yerli önizləmə kimi görünür.', safetyTitle: 'Kömək gələnədək nə edə bilərsən?', safetyItems: ['Öz təhlükəsizliyini və yol hərəkətindən məsafəni qoru; təhlükə varsa təcili xidmətlərə müraciət et.', 'Heyvana sakit səslə yaxınlaş, məsafə saxla və mümkündürsə ətrafdakıları xəbərdar et.', 'Heyvanı tərpətmə, yaralara toxunma və dərman, yemək və ya su vermə. Təlimli mütəxəssisləri gözlə.'], geoUnsupported: 'Bu brauzerdə geolokasiya mümkün deyil. Ünvanı əl ilə daxil et.', adoptKicker: 'SAHİBLƏNDİRMƏ', adoptTitle: 'Yeni ailəsini gözləyənlər.', adoptText: 'Bu profillər nümunədir. Mövcud heyvanlar və sahibləndirmə qaydaları barədə məlumat hələ əlavə edilməyib.', demoPet: 'NÜMUNƏ PROFİL', volunteerKicker: 'KÖNÜLLÜ OL', volunteerTitle: 'Yaxşılıq üçün vaxtını paylaş.', volunteerText: 'Bu qeydiyyat nümayiş üçündür. Əlaqə məlumatları yadda saxlanmır və heç yerə göndərilmir.', nameLabel: 'Ad', namePlaceholder: 'Adın', skillsLabel: 'Necə kömək edə bilərsən?', skillsPlaceholder: 'Məsələn, gəzinti, foto, daşınma, paylaşım', volunteerDone: 'Nümayiş tamamlandı. Məlumatların göndərilmədi və saxlanılmadı.', nameRequired: 'Zəhmət olmasa adını və necə kömək edə biləcəyini yaz.',
  },
  ru: {
    nav: ['О нас', 'Пристройство', 'Срочная помощь', 'Стать волонтёром', 'Контакты'],
    join: 'Присоединиться',
    eyebrow: 'У КАЖДОЙ ЖИЗНИ ЕСТЬ ИСТОРИЯ',
    title: <>Их голос<br />звучит в <em>твоём сердце.</em></>,
    intro: 'Мы дарим любовь, заботу и новый шанс животным, оставшимся одним на улицах. Чтобы быть рядом, не нужно совершать что-то грандиозное.',
    primary: 'Измени одну жизнь', secondary: 'Познакомиться с ними',
    note: 'Маленький шаг — большая надежда.',
    aboutKicker: 'КТО МЫ?', aboutTitle: 'Перемены начинаются с доброты.',
    aboutText: '«Голос безмолвных» (Silent Voices) — инициатива волонтёров, которые объединились, чтобы менять жизнь бездомных животных в Азербайджане. Мы спасаем, лечим, заботимся и находим для них любящие семьи.',
    stat1: 'спасённых жизней', stat2: 'обрели дом', stat3: 'добрых волонтёров', statsDemo: 'Демонстрационные цифры',
    storyKicker: 'НАШИ МАЛЫШИ', storyTitle: 'Они ждут дом, полный любви.',
    storySub: 'Возможно, следующая счастливая история начнётся с тебя.',
    pets: [
      { name: 'Миша', age: 'Около 2 лет', tag: 'Спокойный и добрый', desc: 'Когда-то он был один в парке. Теперь ждёт тёплых объятий и свою семью.' },
      { name: 'Топлан', age: 'Около 1 года', tag: 'Любит играть', desc: 'Этот весёлый парень виляет хвостом каждому и готов стать верным другом.' },
      { name: 'Зузу', age: 'Около 8 месяцев', tag: 'Нежная и любопытная', desc: 'Она принесёт большую любовь на маленьких лапках. Найдётся ли место в твоём сердце?' },
    ],
    meet: 'Познакомиться',
    helpKicker: 'БУДЬ РЯДОМ', helpTitle: 'Есть много способов<br />сделать добро.',
    helpSub: 'Каждый может помочь по-своему. Твоя небольшая поддержка может многое изменить.',
    helpCards: [
      ['01', 'Забрать домой', 'Дом для одного животного может изменить весь его мир. Может быть, этот мир — твой дом?'],
      ['02', 'Стать волонтёром', 'Забота, прогулки, фото или публикация — даже немного твоего времени уже помогает.'],
      ['03', 'Поделиться нужным', 'Узнай у нас, что сейчас нужно: корм, лекарства или временный приют. Помоги по силам.'],
    ],
    details: 'Узнать подробнее', quote: 'Они учат нас доверять.<br />А мы показываем, что они не одни.',
    contactKicker: 'БУДЕМ НА СВЯЗИ', contactTitle: 'Одно сообщение может стать началом новой жизни.', contactText: 'Есть вопрос, хочешь стать волонтёром или подарить дом одному из малышей? Напиши нам — вместе найдём лучший путь.',
    email: 'Написать нам', instagram: 'Мы в Instagram', contactDemo: 'Демонстрационный контакт', footer: 'С любовью и заботой — рядом с каждым.', rights: '© 2026 Silent Voices · Голос безмолвных. Сделано с любовью.',
    modalTitle: 'Начнём вместе', modalText: 'Это демонстрационная страница. Напиши нам, чтобы познакомиться с животными и узнать об их актуальных потребностях.', modalClose: 'Закрыть',
    emergencyKicker: 'СРОЧНАЯ ПОМОЩЬ', emergencyTitle: 'Увидели пострадавшую в ДТП собаку или кошку?', emergencyText: 'Заполните форму только для демонстрации. Данные не отправляются на сервер, личная информация не сохраняется. Спасатели не получат это сообщение.', demoLabel: 'ДЕМО-РЕЖИМ · РЕАЛЬНАЯ ЗАЯВКА НЕ ОТПРАВЛЯЕТСЯ', sosTitle: 'SOS · Вызвать помощь', animalLabel: 'Вид животного', dog: 'Собака', cat: 'Кошка', other: 'Другое', locationLabel: 'Место происшествия', cityLabel: 'Город', cityPlaceholder: 'Например, Баку', streetLabel: 'Улица', streetPlaceholder: 'Улица или проспект', landmarkLabel: 'Ближайший ориентир', landmarkPlaceholder: 'Здание, остановка или известное место', geoButton: 'Определить геолокацию', geoHint: 'При нажатии браузер запросит разрешение на геолокацию.', geoSuccess: 'Координаты добавлены.', geoError: 'Не удалось определить место. Можно ввести адрес вручную.', mapLink: 'Посмотреть на карте', dateLabel: 'Дата и время происшествия', stateLabel: 'Состояние животного', conscious: 'В сознании', notMoving: 'Не двигается', bleeding: 'Кровотечение', unknown: 'Неизвестно', photoLabel: 'Фото животного (необязательно)', descriptionLabel: 'Описание ситуации', descriptionPlaceholder: 'Кратко опишите, что произошло и что вы заметили', contactLabel: 'Контактный телефон (необязательно)', contactPlaceholder: '+994 __ ___ __ __', consentText: 'Я согласен/согласна на обработку контактных данных только в этой демонстрационной форме. Данные не отправляются и не сохраняются.', sendDemo: 'SOS · Вызвать помощь', formDone: 'Заявка спасателям НЕ ОТПРАВЛЕНА. Форма работает в демонстрационном режиме, это не реальный вызов помощи, данные не сохраняются.', fileHint: 'Фото отображается только на этой странице в локальном предпросмотре.', safetyTitle: 'Что можно сделать до прибытия помощи?', safetyItems: ['Соблюдайте собственную безопасность и держитесь подальше от движения; при опасности обратитесь в экстренные службы.', 'Подойдите спокойно, сохраняя дистанцию, и по возможности предупредите окружающих.', 'Не перемещайте животное, не трогайте раны, не давайте лекарства, еду или воду. Дождитесь обученных специалистов.'], geoUnsupported: 'Геолокация недоступна в этом браузере. Введите адрес вручную.', adoptKicker: 'ПРИСТРОЙСТВО', adoptTitle: 'Они ждут свою семью.', adoptText: 'Эти профили приведены в качестве примера. Информация о доступных животных и правилах пристройства пока не добавлена.', demoPet: 'ПРИМЕР ПРОФИЛЯ', volunteerKicker: 'СТАНЬ ВОЛОНТЁРОМ', volunteerTitle: 'Поделись временем и заботой.', volunteerText: 'Эта регистрация работает в демо-режиме. Контакты не сохраняются и никуда не отправляются.', nameLabel: 'Имя', namePlaceholder: 'Ваше имя', skillsLabel: 'Как вы можете помочь?', skillsPlaceholder: 'Например, прогулки, фото, перевозка, публикации', volunteerDone: 'Демонстрация завершена. Данные не отправлялись и не сохранялись.', nameRequired: 'Укажите имя и чем вы можете помочь.',
  },
}

const workflowCopy = {
  az: {
    emergencyText: 'Təcili müraciəti sınaq üçün doldura bilərsən. Müraciət bu kompüterdə saxlanacaq; könüllülərə bildiriş göndərilməyəcək.',
    demoLabel: 'TEST REJİMİ · YERLİ YADDAŞ',
    volunteerDemoLabel: 'NÜMAYİŞ QEYDİYYATI',
    consentText: 'Məlumatların bu kompüterdə sınaq üçün saxlanmasına razıyam. Könüllülərə bildiriş göndərilmir.',
    testNotice: 'Test rejimi. Müraciətlər yalnız bu kompüterdə saxlanılır. Könüllülərə bildiriş göndərilmir.',
    submitError: 'Müraciəti saxlamaq mümkün olmadı. Məlumatlarınız formadadır; səbəb:',
    networkError: 'Yerli serverə qoşulmaq mümkün olmadı. API serverinin işlədiyini yoxlayın.',
    saved: 'Müraciət yadda saxlanıldı',
    photoLimit: 'Foto JPEG, PNG və ya WebP olmalı, ölçüsü 5 MB-dan çox olmamalıdır.',
    panelTitle: 'Könüllü yoxlama paneli', panelSubtitle: 'Yalnız bu kompüterdəki sınaq müraciətləri', panelLink: 'Könüllü paneli',
    refresh: 'Yenilə', loading: 'Yüklənir…', empty: 'Hələ müraciət yoxdur.', list: 'Müraciətlər', details: 'Müraciətin detalları',
    selectRequest: 'Detallarına baxmaq üçün müraciət seçin.', status: 'Status', updateStatus: 'Statusu yenilə', updating: 'Yadda saxlanılır…',
    created: 'Yaradılıb', incident: 'Hadisə vaxtı', animal: 'Heyvan', condition: 'Vəziyyət', address: 'Ünvan', coordinates: 'Koordinatlar',
    description: 'Təsvir', contact: 'Əlaqə', consent: 'Razılıq', history: 'Status tarixçəsi', photo: 'Foto', back: 'Sayta qayıt',
    statusValues: ['help_needed', 'volunteer_dispatched', 'clinic', 'resolved'],
    statuses: ['Kömək tələb olunur', 'Könüllü yola düşüb', 'Klinikaya çatdırılıb', 'Kömək göstərilib'],
    animals: { dog: 'İt', cat: 'Pişik', other: 'Digər' }, conditions: { conscious: 'Şüuru açıqdır', 'not-moving': 'Hərəkət etmir', bleeding: 'Qanaxma var', unknown: 'Naməlum' },
  },
  ru: {
    emergencyText: 'Заполните тестовое срочное обращение. Оно сохранится на этом компьютере; уведомления волонтёрам не отправляются.',
    demoLabel: 'ТЕСТОВЫЙ РЕЖИМ · ЛОКАЛЬНОЕ ХРАНЕНИЕ',
    volunteerDemoLabel: 'ДЕМО-РЕГИСТРАЦИЯ',
    consentText: 'Я согласен/согласна на тестовое хранение данных на этом компьютере. Уведомления волонтёрам не отправляются.',
    testNotice: 'Тестовый режим. Обращения сохраняются только на этом компьютере. Уведомления волонтёрам не отправляются.',
    submitError: 'Не удалось сохранить обращение. Заполненные поля остались в форме. Причина:',
    networkError: 'Не удалось подключиться к локальному серверу. Проверьте, запущен ли API сервер.',
    saved: 'Обращение сохранено', photoLimit: 'Фото должно быть в формате JPEG, PNG или WebP и не больше 5 МБ.',
    panelTitle: 'Тестовая панель волонтёра', panelSubtitle: 'Тестовые обращения только на этом компьютере', panelLink: 'Панель волонтёра',
    refresh: 'Обновить', loading: 'Загрузка…', empty: 'Пока нет обращений.', list: 'Обращения', details: 'Детали обращения',
    selectRequest: 'Выберите обращение, чтобы увидеть детали.', status: 'Статус', updateStatus: 'Изменить статус', updating: 'Сохранение…',
    created: 'Создано', incident: 'Время происшествия', animal: 'Животное', condition: 'Состояние', address: 'Адрес', coordinates: 'Координаты',
    description: 'Описание', contact: 'Контакт', consent: 'Согласие', history: 'История статусов', photo: 'Фото', back: 'Вернуться на сайт',
    statusValues: ['help_needed', 'volunteer_dispatched', 'clinic', 'resolved'],
    statuses: ['Требуется помощь', 'Волонтёр выехал', 'Доставлено в клинику', 'Помощь оказана'],
    animals: { dog: 'Собака', cat: 'Кошка', other: 'Другое' }, conditions: { conscious: 'В сознании', 'not-moving': 'Не двигается', bleeding: 'Кровотечение', unknown: 'Неизвестно' },
  },
}

const petsImages = [
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=900&q=85',
]
const adoptionImages = [
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=85',
]
const adoptionProfiles = {
  az: [ ['Mestan', 'Təxminən 1 yaş', 'Mehriban və sakit'], ['Badi', 'Təxminən 2 yaş', 'Gəzintiləri sevir'], ['Pambıq', 'Təxminən 6 aylıq', 'Maraqlı və oynaq'] ],
  ru: [ ['Мяуся', 'Около 1 года', 'Добрая и спокойная'], ['Бади', 'Около 2 лет', 'Любит прогулки'], ['Пончик', 'Около 6 месяцев', 'Любопытный и игривый'] ],
}

function VolunteerPanel() {
  const [lang, setLang] = useState(document.documentElement.lang === 'ru' ? 'ru' : 'az')
  const [requests, setRequests] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const t = { ...copy[lang], ...workflowCopy[lang] }
  const statusLabel = (value) => t.statuses[t.statusValues.indexOf(value)] || value
  const apiId = (request) => request.id.replace('SOS-', '')

  const loadRequests = async (preferredId) => {
    setLoading(true); setError('')
    try {
      const response = await fetch('/api/sos')
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || t.networkError)
      setRequests(data.requests)
      const next = data.requests.find((item) => item.id === (preferredId || selected?.id)) || data.requests[0] || null
      setSelected(next)
    } catch (err) { setError(err.message || t.networkError) }
    finally { setLoading(false) }
  }

  React.useEffect(() => { loadRequests() }, [])

  const updateStatus = async (status) => {
    if (!selected || saving) return
    setSaving(true); setError('')
    try {
      const response = await fetch(`/api/sos/${apiId(selected)}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ status }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || t.networkError)
      setSelected(data.request)
      setRequests((current) => current.map((item) => item.id === data.request.id ? data.request : item))
    } catch (err) { setError(err.message || t.networkError) }
    finally { setSaving(false) }
  }

  const formatDate = (value) => value ? new Date(value).toLocaleString(lang === 'az' ? 'az-AZ' : 'ru-RU') : '—'
  const address = (item) => [item.city, item.street, item.landmark].filter(Boolean).join(', ')

  return <main className="volunteer-panel">
    <header className="panel-header"><a className="brand" href="/" aria-label={siteNames[lang]}><span className="brand-mark">♡</span><span className="brand-name"><BrandName lang={lang} /></span></a>
      <div className="panel-actions"><div className="language"><button className={lang === 'az' ? 'active' : ''} onClick={() => { setLang('az'); document.documentElement.lang = 'az' }}>AZ</button><span>/</span><button className={lang === 'ru' ? 'active' : ''} onClick={() => { setLang('ru'); document.documentElement.lang = 'ru' }}>RU</button></div><a className="panel-back" href="/">{t.back} ↗</a></div>
    </header>
    <section className="panel-content">
      <div className="eyebrow"><span className="eyebrow-line" />{t.panelSubtitle}</div><h1>{t.panelTitle}</h1>
      <p className="test-notice">♡ {t.testNotice}</p>
      {error && <p className="panel-error" role="alert">{error}</p>}
      <div className="panel-layout">
        <section className="request-list"><div className="panel-section-heading"><h2>{t.list}</h2><button type="button" onClick={() => loadRequests()}>{t.refresh} ↻</button></div>
          {loading ? <p>{t.loading}</p> : requests.length ? requests.map((item) => <button key={item.id} type="button" className={`request-row ${selected?.id === item.id ? 'selected' : ''}`} onClick={() => setSelected(item)}><strong>{item.id}</strong><span>{t.animals[item.animal] || item.animal} · {item.city}</span><small>{statusLabel(item.status)}</small></button>) : <p>{t.empty}</p>}
        </section>
        <section className="request-detail"><h2>{t.details}</h2>{selected ? <>
          <div className="request-number">{selected.id}</div>
          <label>{t.status}<select value={selected.status} disabled={saving} onChange={(event) => updateStatus(event.target.value)}>{t.statusValues.map((value, index) => <option value={value} key={value}>{t.statuses[index]}</option>)}</select></label>
          <dl className="detail-grid"><div><dt>{t.animal}</dt><dd>{t.animals[selected.animal] || selected.animal}</dd></div><div><dt>{t.condition}</dt><dd>{t.conditions[selected.condition] || selected.condition}</dd></div><div><dt>{t.incident}</dt><dd>{formatDate(selected.occurred_at)}</dd></div><div><dt>{t.created}</dt><dd>{formatDate(selected.created_at)}</dd></div><div className="wide"><dt>{t.address}</dt><dd>{address(selected)}</dd></div>{selected.latitude != null && <div className="wide"><dt>{t.coordinates}</dt><dd>{selected.latitude}, {selected.longitude}</dd></div>}<div className="wide"><dt>{t.description}</dt><dd>{selected.description}</dd></div><div className="wide"><dt>{t.contact}</dt><dd>{selected.contact || '—'}</dd></div><div><dt>{t.consent}</dt><dd>{selected.consent ? '✓' : '—'}</dd></div></dl>
          {selected.photoUrl && <div className="panel-photo"><h3>{t.photo}</h3><img src={selected.photoUrl} alt={t.photo} /></div>}
          <div className="history"><h3>{t.history}</h3>{selected.history.map((entry, index) => <div className="history-row" key={`${entry.changedAt}-${index}`}><strong>{statusLabel(entry.status)}</strong><time>{formatDate(entry.changedAt)}</time></div>)}</div>
        </> : <p>{t.selectRequest}</p>}</section>
      </div>
    </section>
  </main>
}

function App() {
  const [lang, setLang] = useState('az')
  const [menuOpen, setMenuOpen] = useState(false)
  const [volunteerSent, setVolunteerSent] = useState(false)
  const [photoPreview, setPhotoPreview] = useState('')
  const [photoFile, setPhotoFile] = useState(null)
  const [sosError, setSosError] = useState('')
  const [savedRequest, setSavedRequest] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const submitLock = useRef(false)
  const [incidentLocation, setIncidentLocation] = useState({ city: '', street: '', landmark: '' })
  const [coordinates, setCoordinates] = useState(null)
  const [geoMessage, setGeoMessage] = useState('')
  const t = { ...copy[lang], ...workflowCopy[lang] }

  React.useEffect(() => {
    document.title = pageTitles[lang]
    document.documentElement.lang = lang
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageDescriptions[lang])
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageTitles[lang])
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', pageDescriptions[lang])
  }, [lang])

  if (import.meta.env.DEV && (window.location.pathname === '/volunteer-panel' || window.location.pathname === '/volunteer-panel/')) return <VolunteerPanel />

  const submitSos = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity() || submitLock.current) return
    submitLock.current = true
    setSubmitting(true); setSosError(''); setSavedRequest('')
    try {
      let photo = null
      if (photoFile) photo = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(new Error(t.photoLimit))
        reader.readAsDataURL(photoFile)
      })
      const values = new FormData(form)
      const payload = {
        animal: values.get('animal'), city: incidentLocation.city, street: incidentLocation.street, landmark: incidentLocation.landmark,
        latitude: coordinates?.latitude ?? null, longitude: coordinates?.longitude ?? null,
        occurredAt: values.get('occurredAt'), condition: values.get('condition'), description: values.get('description'),
        contact: values.get('contact'), consent: values.get('consent') === 'on', photo,
      }
      const response = await fetch('/api/sos', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || t.networkError)
      setSavedRequest(data.request.id)
      form.reset(); setIncidentLocation({ city: '', street: '', landmark: '' }); setCoordinates(null); setGeoMessage('')
      if (photoPreview) URL.revokeObjectURL(photoPreview)
      setPhotoPreview(''); setPhotoFile(null)
    } catch (error) { setSosError(`${t.submitError} ${error.message || t.networkError}`) }
    finally { submitLock.current = false; setSubmitting(false) }
  }

  const mapHref = coordinates
    ? `https://www.openstreetmap.org/?mlat=${coordinates.latitude}&mlon=${coordinates.longitude}#map=17/${coordinates.latitude}/${coordinates.longitude}`
    : Object.values(incidentLocation).some(Boolean)
      ? `https://www.openstreetmap.org/search?query=${encodeURIComponent(Object.values(incidentLocation).filter(Boolean).join(', '))}`
      : ''

  const locateIncident = () => {
    setGeoMessage('')
    if (!navigator.geolocation) { setGeoMessage(t.geoUnsupported); return }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => { setCoordinates({ latitude: coords.latitude, longitude: coords.longitude }); setGeoMessage(t.geoSuccess) },
      () => setGeoMessage(t.geoError),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
  }

  const changeLanguage = (value) => {
    setLang(value)
    setGeoMessage('')
    document.documentElement.lang = value
  }

  const go = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return <>
    <header className="header">
      <a className="brand" href="#top" aria-label={siteNames[lang]}>
        <span className="brand-mark">♡</span><span className="brand-name"><BrandName lang={lang} /></span>
      </a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">{menuOpen ? '×' : '☰'}</button>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
        {t.nav.map((label, i) => <button key={label} onClick={() => go(['about', 'adoption', 'emergency', 'volunteer', 'contact'][i])}>{label}</button>)}
        <div className="nav-actions">
          <div className="language" aria-label="Language selector">
            <button className={lang === 'az' ? 'active' : ''} onClick={() => changeLanguage('az')}>AZ</button><span>/</span><button className={lang === 'ru' ? 'active' : ''} onClick={() => changeLanguage('ru')}>RU</button>
          </div>
          <button className="nav-cta" onClick={() => go('volunteer')}>{t.join}<span>↗</span></button>
        </div>
      </nav>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" />{t.eyebrow}</div>
          <h1>{t.title}</h1>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions">
            <button className="button button-dark" onClick={() => go('help')}>{t.primary}<span>↗</span></button>
            <button className="button button-link" onClick={() => go('stories')}>{t.secondary}<span>↓</span></button>
          </div>
          <div className="hero-note"><span className="tiny-heart">♡</span>{t.note}</div>
        </div>
        <div className="hero-art">
          <div className="hero-image" role="img" aria-label="A dog looking hopefully into the camera" />
          <div className="hero-sticker"><span>♥</span><small>{lang === 'az' ? 'sevgi ilə' : 'с любовью'}</small></div>
          <div className="hero-caption"><span className="caption-dot" />{lang === 'az' ? 'Hər biri ikinci şansa layiqdir' : 'Каждый заслуживает второго шанса'}</div>
          <svg className="hero-doodle" viewBox="0 0 110 95" fill="none" aria-hidden="true"><path d="M5 55c15-40 37-37 42-11 4 23 10 34 24 29 15-5 14-31 5-42-10-13-24-9-25 7-1 18 19 34 51 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="m94 60 9 8-12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="hero-side-label">BAKI · AZƏRBAYCAN</div>
      </section>

      <section className="about section-pad" id="about">
        <div className="about-art"><div className="about-photo" /><div className="about-scribble">kindness<br />changes<br /><em>everything</em></div><div className="sun-shape" /></div>
        <div className="about-content">
          <div className="eyebrow"><span className="eyebrow-line" />{t.aboutKicker}</div>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
          <div className="stats">
            <div><strong>120<span>+</span></strong><small>{t.stat1}</small></div>
            <div><strong>86</strong><small>{t.stat2}</small></div>
            <div><strong>34</strong><small>{t.stat3}</small></div>
          </div>
          <small className="data-note">{t.statsDemo}</small>
        </div>
      </section>

      <section className="stories section-pad" id="stories">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-line" />{t.storyKicker}</div><h2>{t.storyTitle}</h2></div>
          <p>{t.storySub}</p>
        </div>
        <div className="pet-grid">
          {t.pets.map((pet, i) => <article className="pet-card" key={pet.name}>
            <div className="pet-image-wrap"><img src={petsImages[i]} alt={pet.name} /><span className="pet-tag">♡ {pet.tag}</span></div>
            <div className="pet-info"><div className="pet-title"><h3>{pet.name}</h3><span>{pet.age}</span></div><p>{pet.desc}</p><button onClick={() => go('contact')}>{t.meet}<span>↗</span></button></div>
          </article>)}
        </div>
      </section>

      <section className="adoption section-pad" id="adoption">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" />{t.adoptKicker}</div><h2>{t.adoptTitle}</h2></div><p>{t.adoptText}</p></div>
        <div className="pet-grid">{adoptionProfiles[lang].map(([name, age, trait], i) => <article className="pet-card adoption-card" key={name}>
          <div className="pet-image-wrap"><img src={adoptionImages[i]} alt={name} /><span className="pet-tag">{t.demoPet}</span></div>
          <div className="pet-info"><div className="pet-title"><h3>{name}</h3><span>{age}</span></div><p>{trait}</p><button onClick={() => go('contact')}>{t.meet}<span>↗</span></button></div>
        </article>)}</div>
      </section>

      <section className="emergency section-pad" id="emergency">
        <div className="form-intro"><div className="eyebrow"><span className="eyebrow-line" />{t.emergencyKicker}</div><h2>{t.emergencyTitle}</h2><p>{t.emergencyText}</p><div className="demo-label">♡ {t.testNotice}</div><a className="panel-shortcut" href="/volunteer-panel">{t.panelLink} ↗</a>
          <aside className="safety-note"><h3>♡ {t.safetyTitle}</h3><ul>{t.safetyItems.map((item) => <li key={item}>{item}</li>)}</ul></aside>
        </div>
        <form className="demo-form sos-form" onSubmit={submitSos}>
          <h3 className="sos-form-title"><span>♥</span>{t.sosTitle}</h3>
          <p className="test-notice form-test-notice">♡ {t.testNotice}</p>
          <label>{t.animalLabel}<select name="animal" defaultValue="dog" required><option value="dog">{t.dog}</option><option value="cat">{t.cat}</option><option value="other">{t.other}</option></select></label>
          <fieldset className="location-fields"><legend>{t.locationLabel}</legend>
            <div className="location-grid">
              <label>{t.cityLabel}<input name="city" required value={incidentLocation.city} placeholder={t.cityPlaceholder} onChange={(e) => { setIncidentLocation({ ...incidentLocation, city: e.target.value }); setCoordinates(null) }} /></label>
              <label>{t.streetLabel}<input name="street" required value={incidentLocation.street} placeholder={t.streetPlaceholder} onChange={(e) => { setIncidentLocation({ ...incidentLocation, street: e.target.value }); setCoordinates(null) }} /></label>
              <label className="landmark-field">{t.landmarkLabel}<input name="landmark" value={incidentLocation.landmark} placeholder={t.landmarkPlaceholder} onChange={(e) => { setIncidentLocation({ ...incidentLocation, landmark: e.target.value }); setCoordinates(null) }} /></label>
            </div>
            <div className="geo-row"><button className="geo-button" type="button" onClick={locateIncident}>⌖ {t.geoButton}</button><small>{t.geoHint}</small></div>
            {geoMessage && <small className="geo-message" role="status">{geoMessage}</small>}
            {mapHref && <a className="map-link" href={mapHref} target="_blank" rel="noreferrer">↗ {t.mapLink}</a>}
          </fieldset>
          <label>{t.dateLabel}<input name="occurredAt" type="datetime-local" required /></label>
          <fieldset className="state-fields"><legend>{t.stateLabel}</legend><div className="state-options">
            {[['conscious', t.conscious], ['not-moving', t.notMoving], ['bleeding', t.bleeding], ['unknown', t.unknown]].map(([value, label]) => <label className="choice-chip" key={value}><input type="radio" name="condition" value={value} required />{label}</label>)}
          </div></fieldset>
          <label>{t.photoLabel}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => { const file = e.target.files?.[0]; if (photoPreview) URL.revokeObjectURL(photoPreview); setPhotoFile(file || null); setPhotoPreview(file && file.size <= 5 * 1024 * 1024 && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ? URL.createObjectURL(file) : ''); if (file && (file.size > 5 * 1024 * 1024 || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type))) setSosError(t.photoLimit); else setSosError('') }} /><small>{t.photoLimit}</small></label>
          {photoPreview && <img className="photo-preview" src={photoPreview} alt={t.photoLabel} />}
          <label>{t.descriptionLabel}<textarea name="description" required rows="4" placeholder={t.descriptionPlaceholder} /></label>
          <label>{t.contactLabel}<input name="contact" type="tel" autoComplete="tel" placeholder={t.contactPlaceholder} /></label>
          <label className="consent-row"><input name="consent" type="checkbox" required /><span>{t.consentText}</span></label>
          <button className="button button-dark sos-submit" type="submit" disabled={submitting}><span>♥</span>{submitting ? t.updating : t.sendDemo}</button>
          {sosError && <p className="form-error" role="alert">{sosError}</p>}
          {savedRequest && <p className="form-success" role="status">{t.saved}: <strong>{savedRequest}</strong></p>}
        </form>
      </section>

      <section className="volunteer section-pad" id="volunteer">
        <div className="volunteer-art" aria-hidden="true"><span>♡</span><small>vaxtın<br />dəyərlidir</small></div>
        <div className="volunteer-content"><div className="eyebrow"><span className="eyebrow-line" />{t.volunteerKicker}</div><h2>{t.volunteerTitle}</h2><p>{t.volunteerText}</p><div className="demo-label">♡ {t.volunteerDemoLabel}</div>
          <form className="demo-form volunteer-form" onSubmit={(e) => { e.preventDefault(); if (e.currentTarget.reportValidity()) { e.currentTarget.reset(); setVolunteerSent(true) } }}>
            <label>{t.nameLabel}<input required placeholder={t.namePlaceholder} /></label>
            <label>{t.contactLabel}<input type="text" placeholder={t.contactPlaceholder} /></label>
            <label>{t.skillsLabel}<textarea required rows="3" placeholder={t.skillsPlaceholder} /></label>
            <button className="button button-dark" type="submit">{t.join}<span>↗</span></button>
            {volunteerSent && <p className="form-success" role="status">{t.volunteerDone}</p>}
          </form>
        </div>
      </section>

      <section className="help section-pad" id="help">
        <div className="help-head"><div className="eyebrow"><span className="eyebrow-line" />{t.helpKicker}</div><h2 dangerouslySetInnerHTML={{ __html: t.helpTitle }} /><p>{t.helpSub}</p><div className="help-flower">✳</div></div>
        <div className="help-grid">{t.helpCards.map(([num, title, text]) => <article className="help-card" key={num}><span className="help-number">{num}</span><div className="help-icon">{num === '01' ? '⌂' : num === '02' ? '♡' : '✿'}</div><h3>{title}</h3><p>{text}</p><button onClick={() => go('contact')}>{t.details}<span>↗</span></button></article>)}</div>
      </section>

      <section className="quote-band"><div className="quote-mark">“</div><p dangerouslySetInnerHTML={{ __html: t.quote }} /><span className="quote-heart">♡</span></section>

      <section className="contact section-pad" id="contact">
        <div className="contact-illustration"><div className="contact-circle"><span>♡</span></div><div className="contact-paw">🐾</div><div className="contact-sun" /></div>
        <div className="contact-content"><div className="eyebrow"><span className="eyebrow-line" />{t.contactKicker}</div><h2>{t.contactTitle}</h2><p>{t.contactText}</p>
          <div className="contact-actions"><a className="button button-dark" href="mailto:hello@sessizlerin-sesi.az">{t.email}<span>↗</span></a><a className="social-link" href="https://instagram.com" target="_blank" rel="noreferrer">◎ {t.instagram}<span>↗</span></a></div>
          <small className="contact-email">{t.contactDemo}: hello@sessizlerin-sesi.az</small>
        </div>
      </section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="#top" aria-label={siteNames[lang]}><span className="brand-mark">♡</span><span className="brand-name"><BrandName lang={lang} /></span></a><p>{t.footer}</p><small>{t.rights}</small></footer>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
