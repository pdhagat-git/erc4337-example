import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from './common/config/config.service'
import helmet from 'helmet'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService>(ConfigService)

  const globalPrefix = 'api/v1'
  app.setGlobalPrefix(globalPrefix)

  app.use(helmet())

  const port = configService.get('app.port')
  await app.listen(port)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  )
}

bootstrap()
