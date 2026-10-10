export const SKILLS = [
  { name: 'TypeScript', level: 5 },
  { name: 'JavaScript', level: 5 },
  { name: 'Node.js', level: 5 },
  { name: 'C++', level: 2 },
  { name: 'RUSTlang', level: 2 },

  { name: 'NestJS', level: 4 },
  { name: 'Express', level: 4 },
  { name: 'GraphQL', level: 4 },
  { name: 'REST', level: 4 },
  { name: 'PostgreSQL', level: 4 },

  { name: 'React', level: 5 },
  { name: 'Vue 3', level: 5 },
  { name: 'Composition API', level: 5 },
  { name: 'Material-UI', level: 4 },
  { name: 'Vuetify', level: 4 },
  { name: 'Electron', level: 5 },

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

  { name: 'Docker Compose', level: 4 },
  { name: 'Nginx', level: 3 },
  { name: 'TLS / SSL', level: 3 },
  { name: 'OpenSSL', level: 3 },
  { name: 'JWT', level: 4 },
  { name: 'RBAC', level: 4 },
  { name: 'Grafana', level: 3 },
  { name: 'Prometheus', level: 3 },

  { name: 'Видеонаблюдение', level: 4 },
  { name: '1С', level: 2 }
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
  }
] as const

export const EXPERIENCE = [
  {
    id: 'exp-stilsoft-murom',
    company: 'Стилсофт',
    position: 'Fullstack-разработчик',
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
      'Grafana'
    ]
  },
  {
    id: 'exp-stilsoft-synerget',
    company: 'Стилсофт',
    position: 'Fullstack-разработчик',
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
      'Grafana'
    ]
  }
] as const

export const HOBBIES = [
  { name: 'Гитара' },
  { name: 'Бас' },
  { name: 'Ударные' },
  { name: 'Вокал' },
  { name: 'Продюсирование музыки' },
  { name: 'Звукорежисертво' },
  { name: 'Страйкбол' },
  { name: 'Прогулки' },
  { name: 'Онлайн созвоны' },
  { name: 'Блоггинг' }
]
