import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { TransactionsService } from './transactions.service'
import { UseAuth, UseUser } from '@auth/decorators'
import { User } from '@users/entities'
import { TransactionListDto, CreateTransactionDto, UpdateTransactionDto } from './dtos/requests'
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

  /**
   * Get transaction by ID
   *
   * @param id - Transaction ID
   * @param user - User
   * @returns Transaction
   */
  @Get(':id')
  @UseAuth()
  @ApiOkResponse({ type: Transaction })
  get(@Param('id') id: string, @UseUser() user: User): Promise<Transaction> {
    return this.service.get(id, user)
  }

  /**
   * Update transaction
   *
   * @param id - Transaction ID
   * @param body - Transaction data
   * @param user - User
   * @returns Updated transaction
   */
  @Put(':id')
  @UseAuth()
  @ApiOkResponse({ type: Transaction })
  update(@Param('id') id: string, @Body() body: UpdateTransactionDto, @UseUser() user: User): Promise<Transaction> {
    return this.service.update(id, body, user)
  }

  /**
   * Delete transaction
   *
   * @param id - Transaction ID
   * @param user - User
   * @returns Deleted transaction
   */
  @Delete(':id')
  @UseAuth()
  @ApiOkResponse()
  delete(@Param('id') id: string, @UseUser() user: User): Promise<void> {
    return this.service.delete(id, user)
  }
}
