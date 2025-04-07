import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@auth/auth.module'
import { PrismaModule } from '@prisma/prisma.module'
import { PrismaExistValidator } from '@prisma/decorators/exist-on-db.decorator'

import configuration from './config/configuration'
import { UsersModule } from '@users/users.module'
import { TransactionsModule } from './transactions/transactions.module'
import { AccountsModule } from '@accounts/accounts.module'
import { AccountCategoriesModule } from '@account-categories/account-categories.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    TransactionsModule,
    AccountsModule,
    AccountCategoriesModule,
  ],
  providers: [PrismaExistValidator],
  controllers: [],
  exports: [],
})
export class AppModule {}
