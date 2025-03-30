import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dtos/create.dto'

@Controller('transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Post()
  create(@Body() body: CreateTransactionDto) {
    return this.service.create(body)
  }
}
