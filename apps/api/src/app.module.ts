import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AccountCategoriesModule } from '@/account-categories/account-categories.module'
import { AccountsModule } from '@/accounts/accounts.module'
import { AssetsModule } from '@/assets/assets.module'
import { AuthModule } from '@/auth/auth.module'
import { BudgetsModule } from '@/budgets/budgets.module'
import configuration from '@/config/configuration'
import { InvestmentTransactionsModule } from '@/investment-transactions/investment-transactions.module'
import { PrismaExistValidator } from '@/prisma/decorators/exist-on-db.decorator'
import { PrismaModule } from '@/prisma/prisma.module'
import { TransactionCategoriesModule } from '@/transaction-categories/transaction-categories.module'
import { TransactionsModule } from '@/transactions/transactions.module'
import { UsersModule } from '@/users/users.module'

import { LoggerModule } from './common'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    LoggerModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    TransactionsModule,
    AccountsModule,
    AccountCategoriesModule,
    TransactionCategoriesModule,
    AssetsModule,
    BudgetsModule,
    InvestmentTransactionsModule,
  ],
  providers: [PrismaExistValidator],
  controllers: [],
  exports: [],
})
export class AppModule {}
