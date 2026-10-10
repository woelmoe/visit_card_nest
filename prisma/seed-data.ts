export const SKILLS: string[] = [
  'TypeScript',
  'Node.js',
  'C++',
  'JavaScript',
  'RUSTlang',

  'NestJS',
  'Express',
  'GraphQL',
  'REST',
  'PostgreSQL',

  'React',
  'Vue 3',
  'Composition API',
  'Material-UI',
  'Vuetify',
  'Electron',

  'RabbitMQ',
  'AMQP',

  'WebSocket',
  'SSE',
  'WebRTC',
  'WHEP',
  'gRPC',
  'Protobuf',
  'HTTP/2',
  'mTLS',

  'ffmpeg',
  'MediaMTX',
  'RTSP',
  'HLS',

  'Vite',
  'Webpack',
  'Git',
  'Git Flow',
  'БЭМ',
  'utility-first',

  'Docker Compose',
  'Nginx',
  'TLS / SSL',
  'OpenSSL',
  'JWT',
  'RBAC',
  'Grafana',
  'Prometheus',

  'СКУД',
  'IoT',
  'Видеонаблюдение',
  '1С'
]

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
