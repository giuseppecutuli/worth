import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { TransactionsService } from './transactions.service'
import { UseAuth, UseUser } from '@auth/decorators'
import { User } from '@users/entities'
import { TransactionListDto, CreateTransactionDto } from './dtos/requests'
import { ApiPaginatedResponse } from '@common/utils/swagger'
import { Transaction } from './entities'
import { PaginatedDto } from '@common/dtos'

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  /**
   * List transactions
   *
   * @param query - Query params
   * @param user - User
   * @returns Paginated transactions
   */
  @Get()
  @UseAuth()
  @ApiPaginatedResponse(Transaction)
  list(@Query() query: TransactionListDto, @UseUser() user: User): Promise<PaginatedDto<Transaction>> {
    return this.service.list(query, user)
  }

  /**
   * Create a transaction
   *
   * @param body - Transaction data
   * @param user - User
   * @returns Created transaction
   */
  @Post()
  @UseAuth()
  @ApiOkResponse({ type: Transaction })
  create(@Body() body: CreateTransactionDto, @UseUser() user: User): Promise<Transaction> {
    return this.service.create(body, user)
  }
}
