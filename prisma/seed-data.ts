export interface IExperienceSeed {
  id: string
  startDate: Date
  endDate: Date | null
  projectId: string
  skillNames: string[]
  employment?: {
    id: string
    company: string
    position: string
  }
}

export const SKILLS = [
  { name: 'TypeScript', level: 5 },
  { name: 'JavaScript', level: 5 },
  { name: 'Node.js', level: 5 },
  { name: 'C++', level: 2 },
  { name: 'RUSTlang', level: 2 },
  { name: 'Python', level: 3 },

  { name: 'NestJS', level: 5 },
  { name: 'Express', level: 5 },
  { name: 'GraphQL', level: 5 },
  { name: 'REST', level: 5 },
  { name: 'PostgreSQL', level: 5 },
  { name: 'Prisma', level: 4 },
  { name: 'Sequelize', level: 3 },
  { name: 'Django', level: 3 },

  { name: 'React', level: 5 },
  { name: 'Vue 3', level: 5 },
  { name: 'Composition API', level: 5 },
  { name: 'Material-UI', level: 4 },
  { name: 'Vuetify', level: 4 },
  { name: 'Electron', level: 5 },
  { name: 'Nuxt', level: 5 },
  { name: 'Pinia', level: 4 },
  { name: 'Zustand', level: 4 },
  { name: 'SSR', level: 4 },
  { name: 'OpenLayers', level: 4 },

  { name: 'HTML', level: 5 },
  { name: 'CSS', level: 4 },

  { name: 'RabbitMQ', level: 4 },
  { name: 'AMQP', level: 4 },
  { name: 'WebSocket', level: 5 },
  { name: 'SSE', level: 5 },
  { name: 'WebRTC', level: 3 },
  { name: 'WHEP', level: 3 },
  { name: 'gRPC', level: 3 },
  { name: 'HTTP/2', level: 4 },
  { name: 'mTLS', level: 3 },

  { name: 'ffmpeg', level: 2 },
  { name: 'MediaMTX', level: 3 },
  { name: 'RTSP', level: 3 },
  { name: 'HLS', level: 3 },

  { name: 'Vite', level: 4 },
  { name: 'Webpack', level: 4 },
  { name: 'Git', level: 5 },
  { name: 'Git Flow', level: 5 },
  { name: 'БЭМ', level: 5 },
  { name: 'utility-first', level: 4 },

  { name: 'Docker', level: 4 },
  { name: 'Docker Compose', level: 4 },
  { name: 'Nginx', level: 3 },
  { name: 'TLS / SSL', level: 3 },
  { name: 'OpenSSL', level: 3 },
  { name: 'JWT', level: 4 },
  { name: 'RBAC', level: 4 },
  { name: 'Swagger', level: 4 },
  { name: 'Grafana', level: 3 },
  { name: 'Prometheus', level: 3 },

  { name: 'Видеонаблюдение', level: 4 },
  { name: '1С', level: 2 },
  { name: 'Telegram Bot API', level: 2 }
] as const

export const PROJECTS = [
  {
    id: 'project-murom',
    name: 'Муром',
    description:
      'B2G/B2B-система операторского класса: поворотное устройство + видеокамера + тепловизор',
    url: 'https://stilsoft.ru/products/murom1'
  },
  {
    id: 'project-synerget',
    name: 'Синергет',
    description:
      'Сеть АРМ для работы с устройствами: датчики, СКУД, видеокамеры',
    url: 'https://stilsoft.ru/products/synerget'
  },

  // Пет-проекты
  {
    id: 'project-visit-card',
    name: 'Visit Card (NestJS)',
    description:
      'Backend-визитка на NestJS + Prisma + GraphQL + Docker. Текущий проект — тестовое задание.',
    url: 'https://github.com/woelmoe/visit_card_nest'
  },
  {
    id: 'project-marketplace',
    name: 'UX-Market',
    description: 'Интернет-магазин на Nuxt 3 + Vuetify + NestJS. SSR, Pinia.',
    url: 'https://github.com/woelmoe/marketplace-app'
  },
  {
    id: 'project-1kk-dnd',
    name: '1kk-el-dnd-filter',
    description:
      'React + Express.js. Работа со списком 1 000 000 элементов: пагинация, фильтрация, батчинг, drag-and-drop, синхронизация вкладок через SSE.',
    url: 'https://github.com/woelmoe/1kk-el-dnd-filter'
  },
  {
    id: 'project-greenapi',
    name: 'WhatsApp GreenAPI',
    description:
      'Мессенджер в браузере на React + TypeScript + MUI. Отправка и приём через официальный WhatsApp API от GREEN-API.',
    url: 'https://github.com/woelmoe/greenapi'
  },
  {
    id: 'project-worldmap',
    name: 'Worldmap OpenLayers',
    description:
      'Тестовое задание на позицию middle-разработчика ООО Стилсофт. Интерактивная карта мира на Vue 3 + TypeScript + Vite + OpenLayers.',
    url: 'https://github.com/woelmoe/worldmap-openlayer'
  },
  {
    id: 'project-stilconf-nest-back',
    name: 'Stilconf Nest Back',
    description:
      'Backend для видео-чата на NestJS: WebSocket-сервер, регистрация пользователей, история сообщений, сигнальный сервер, BroadcastMessage, Swagger.',
    url: 'https://github.com/woelmoe/stilconf-nest-back'
  },
  {
    id: 'project-stilconf-test-front',
    name: 'Stilconf Test Front',
    description:
      'Frontend для видео-чата на Nuxt 3: WebSocket-соединение, сигнальный сервер, BroadcastMessage, моковые команды, Vitest-тесты.',
    url: 'https://github.com/woelmoe/stilconf-test-front'
  },
  {
    id: 'project-stiljira',
    name: 'Stiljira',
    description:
      'Тестовое задание на позицию senior-разработчика в ООО Стилсофт. Fullstack-трекер задач на Express + PostgreSQL: CRUD тасок, Sequelize, Nginx как reverse-proxy.',
    url: 'https://github.com/woelmoe/stiljira-express-postgress'
  },
  {
    id: 'project-worldwine',
    name: 'WorldWine',
    description:
      'Учебный проект. Интерактивная карта винодельческих регионов: хитбоксы стран с тултипами, сайдменю, дополнительные страницы.',
    url: 'https://github.com/woelmoe/worldwine'
  },
  {
    id: 'project-coffeetelegreambot',
    name: 'CoffeeTelegramBot',
    description:
      'Telegram-бот на Node.js: /help со списком участников, /столовка и /заказ, запоминание и удаление сообщений, утренний daily encourage.',
    url: 'https://github.com/woelmoe/coffeetelegreambot'
  }
] as const

export const EXPERIENCE: IExperienceSeed[] = [
  {
    id: 'exp-stilsoft-murom',
    employment: {
      id: 'emp-stilsoft-murom',
      company: 'Стилсофт',
      position: 'Fullstack-разработчик'
    },
    startDate: new Date('2021-07-20'),
    endDate: new Date('2026-06-15'),
    projectId: 'project-murom',
    skillNames: [
      'TypeScript',
      'Node.js',
      'Express',
      'Electron',
      'Vue 3',
      'Docker Compose',
      'Composition API',
      'gRPC',
      'RabbitMQ',
      'AMQP',
      'JWT',
      'RBAC',
      'WebRTC',
      'WHEP',
      'MediaMTX',
      'RTSP',
      'Nginx',
      'TLS / SSL',
      'OpenSSL',
      'PostgreSQL',
      'Grafana',
      'Git',
      'Git Flow'
    ]
  },
  {
    id: 'exp-stilsoft-synerget',
    employment: {
      id: 'emp-stilsoft-synerget',
      company: 'Стилсофт',
      position: 'Fullstack-разработчик'
    },
    startDate: new Date('2022-10-10'),
    endDate: new Date('2026-04-10'),
    projectId: 'project-synerget',
    skillNames: [
      'TypeScript',
      'Node.js',
      'Express',
      'Electron',
      'Vue 3',
      'Docker Compose',
      'Composition API',
      'gRPC',
      'RabbitMQ',
      'AMQP',
      'JWT',
      'RBAC',
      'WebRTC',
      'WHEP',
      'MediaMTX',
      'RTSP',
      'Nginx',
      'TLS / SSL',
      'OpenSSL',
      'PostgreSQL',
      'Grafana',
      'Git',
      'Git Flow'
    ]
  },

  // Пет-проекты
  {
    id: 'exp-visit-card',
    startDate: new Date('2026-10-01'),
    endDate: null,
    projectId: 'project-visit-card',
    skillNames: [
      'TypeScript',
      'NestJS',
      'GraphQL',
      'Prisma',
      'PostgreSQL',
      'Docker',
      'Git',
      'Git Flow'
    ]
  },
  {
    id: 'exp-marketplace',
    startDate: new Date('2024-09-10'),
    endDate: new Date('2024-10-15'),
    projectId: 'project-marketplace',
    skillNames: [
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'Docker',
      'Vue 3',
      'Nuxt',
      'Vuetify',
      'Composition API',
      'Pinia',
      'SSR',
      'Git',
      'Git Flow'
    ]
  },
  {
    id: 'exp-1kk-dnd',
    startDate: new Date('2024-10-04'),
    endDate: new Date('2024-10-09'),
    projectId: 'project-1kk-dnd',
    skillNames: [
      'TypeScript',
      'Node.js',
      'Express',
      'React',
      'Material-UI',
      'Vite',
      'Zustand',
      'SSE',
      'WebSocket',
      'Git',
      'Git Flow'
    ]
  },
  {
    id: 'exp-greenapi',
    startDate: new Date('2024-10-01'),
    endDate: new Date('2024-10-12'),
    projectId: 'project-greenapi',
    skillNames: ['TypeScript', 'React', 'Material-UI', 'Vite', 'REST', 'Git']
  },
  {
    id: 'exp-worldmap',
    startDate: new Date('2023-06-25'),
    endDate: new Date('2023-07-01'),
    projectId: 'project-worldmap',
    skillNames: [
      'Vue 3',
      'Composition API',
      'Vite',
      'TypeScript',
      'OpenLayers',
      'Git'
    ]
  },
  {
    id: 'exp-stilconf-nest-back',
    startDate: new Date('2023-12-20'),
    endDate: new Date('2024-01-22'),
    projectId: 'project-stilconf-nest-back',
    skillNames: [
      'TypeScript',
      'NestJS',
      'WebSocket',
      'REST',
      'PostgreSQL',
      'Docker',
      'Swagger',
      'JWT',
      'Git'
    ]
  },
  {
    id: 'exp-stilconf-test-front',
    startDate: new Date('2023-12-20'),
    endDate: new Date('2024-01-21'),
    projectId: 'project-stilconf-test-front',
    skillNames: [
      'TypeScript',
      'Vue 3',
      'Nuxt',
      'Composition API',
      'WebSocket',
      'Git'
    ]
  },
  {
    id: 'exp-stiljira',
    startDate: new Date('2024-07-20'),
    endDate: new Date('2024-08-02'),
    projectId: 'project-stiljira',
    skillNames: [
      'JavaScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Sequelize',
      'Docker',
      'Docker Compose',
      'Nginx',
      'REST',
      'Git'
    ]
  },
  {
    id: 'exp-worldwine',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-06-04'),
    projectId: 'project-worldwine',
    skillNames: ['Python', 'Django', 'HTML', 'CSS', 'Git']
  },
  {
    id: 'exp-coffeetelegreambot',
    startDate: new Date('2023-05-03'),
    endDate: new Date('2023-05-27'),
    projectId: 'project-coffeetelegreambot',
    skillNames: ['JavaScript', 'Node.js', 'Telegram Bot API', 'Git']
  }
]

export const HOBBIES = [
  { name: 'Гитара' },
  { name: 'Бас' },
  { name: 'Ударные' },
  { name: 'Вокал' },
  { name: 'Продюсирование музыки' },
  { name: 'Звукорежиссёрство' },
  { name: 'Страйкбол' },
  { name: 'Прогулки' },
  { name: 'Онлайн созвоны' },
  { name: 'Блоггинг' }
] as const
