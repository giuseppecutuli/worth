import { Module } from '@nestjs/common'
import { InvestmentTransactionsController } from './investment-transactions.controller'
import { InvestmentTransactionsService } from './investment-transactions.service'

@Module({
  controllers: [InvestmentTransactionsController],
  providers: [InvestmentTransactionsService],
  exports: [],
})
export class InvestmentTransactionsModule {}
