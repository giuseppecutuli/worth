import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from './services/auth.service'
import { Config } from './interfaces/config.interface'
import configuration from './config/configuration'
import { PrismaService } from './services/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtConfig = configService.get<Config['jwt']>('jwt')

        return {
          secret: jwtConfig?.secret,
          signOptions: { expiresIn: jwtConfig?.expiresIn },
        }
      },
    }),
  ],
  providers: [JwtStrategy, AuthService, PrismaService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
