import { Global, Module } from '@nestjs/common'
import { OpenBankingService } from './open-banking.service'

@Global()
@Module({
  controllers: [],
  providers: [OpenBankingService],
  exports: [OpenBankingService],
})
export class OpenBankingModule {}
