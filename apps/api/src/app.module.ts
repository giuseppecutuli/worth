import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@/auth/auth.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { PrismaExistValidator } from '@/prisma/decorators/exist-on-db.decorator'

import configuration from '@/config/configuration'
import { UsersModule } from '@/users/users.module'
import { TransactionsModule } from '@/transactions/transactions.module'
import { AccountsModule } from '@/accounts/accounts.module'
import { AccountCategoriesModule } from '@/account-categories/account-categories.module'
import { TransactionCategoriesModule } from '@/transaction-categories/transaction-categories.module'
import { AssetsModule } from '@/assets/assets.module'
import { BudgetsModule } from '@/budgets/budgets.module'
import { InvestmentTransactionsModule } from '@/investment-transactions/investment-transactions.module'

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
