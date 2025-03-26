import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@auth/auth.module'
import { PrismaModule } from '@prisma/prisma.module'

import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class AppModule {}
