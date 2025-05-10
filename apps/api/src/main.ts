import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import { Logger as PinoLogger } from 'nestjs-pino'

import { validationExceptionFactory } from '@/common/utils'
import { Config } from '@/config/config.interface'
import { PrismaClientExceptionFilter } from '@/prisma/filters/prisma-client-exception.filter'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  app.useLogger(app.get(PinoLogger))

  const configService = app.get(ConfigService)
  const nestConfig = configService.get<Config['nest']>('nest')
  const corsConfig = configService.get<Config['cors']>('cors')
  const swaggerConfig = configService.get<Config['swagger']>('swagger')

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: validationExceptionFactory,
    }),
  )
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  // Swagger Api
  if (swaggerConfig?.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup(swaggerConfig.path, app, document)
  }

  // enable shutdown hook
  app.enableShutdownHooks()

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  // Cors
  if (corsConfig?.enabled) {
    app.enableCors()
  }

  const port = nestConfig?.port || 3000

  await app.listen(port)

  Logger.log(`Application is running on: http://localhost:${port}`)
}

bootstrap()
