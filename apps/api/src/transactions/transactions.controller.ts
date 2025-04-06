import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dtos/create.dto'
import { UseAuth, UseUser } from '@auth/decorators'
import { User } from '@users/entities'

@Controller('transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Post()
  @UseAuth()
  create(@Body() body: CreateTransactionDto, @UseUser() user: User) {
    return this.service.create(body, user)
  }
}
