import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@auth/auth.module'
import { PrismaModule } from '@prisma/prisma.module'
import { PrismaExistValidator } from '@prisma/decorators/exist-on-db.decorator'

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
  providers: [PrismaExistValidator],
  controllers: [],
  exports: [],
})
export class AppModule {}
