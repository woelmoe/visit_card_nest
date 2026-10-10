import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
import { ValidationPipe } from '@nestjs/common'

const port = process.env.PORT ?? 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const validation = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  })
  app.useGlobalPipes(validation)
  await app.listen(port)
}
await bootstrap()
console.log(`listen on http://localhost:${port}`)
