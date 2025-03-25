import { NestFactory } from '@nestjs/core'
import { AuthModule } from './auth.module'
import { ConfigService } from '@nestjs/config'
import { Config } from './interfaces/config.interface'
import { Logger, ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AuthModule)

  const configService = app.get(ConfigService)
  const nestConfig = configService.get<Config['nest']>('nest')
  const corsConfig = configService.get<Config['cors']>('cors')
  const swaggerConfig = configService.get<Config['swagger']>('swagger')

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  useContainer(app.select(AuthModule), { fallbackOnErrors: true })

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

  // Cors
  if (corsConfig?.enabled) {
    app.enableCors()
  }

  const port = nestConfig?.port || 3000

  await app.listen(port)

  Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
