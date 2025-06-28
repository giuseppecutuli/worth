import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { UseAuth, UseUser } from '@/auth/decorators'
import { PaginatedDto } from '@/common/dtos'
import { ApiPaginatedResponse } from '@/common/utils/swagger'
import { User } from '@/users/entities'

import {
  CreateInvestmentTransactionDto,
  InvestmentTransactionListDto,
  UpdateInvestmentTransactionDto,
} from './dtos/requests'
import { InvestmentTransaction } from './entities'
import { InvestmentTransactionsService } from './investment-transactions.service'

@Controller('investment-transactions')
@ApiTags('Investment Transactions')
export class InvestmentTransactionsController {
  constructor(private readonly service: InvestmentTransactionsService) {}

  /**
   * List investment transactions
   *
   * @param query - Query params
   * @param user - User
   * @returns Paginated investment transactions
   */
  @Get()
  @UseAuth()
  @ApiPaginatedResponse(InvestmentTransaction)
  list(
    @Query() query: InvestmentTransactionListDto,
    @UseUser() user: User,
  ): Promise<PaginatedDto<InvestmentTransaction>> {
    return this.service.list(query, user)
  }

  /**
   * Create a investment transaction
   *
   * @param body - Investment transaction data
   * @param user - User
   * @returns Created investment transaction
   */
  @Post()
  @UseAuth()
  @ApiOkResponse({ type: InvestmentTransaction })
  create(
    @Body() body: CreateInvestmentTransactionDto,
    @UseUser() user: User,
  ): Promise<InvestmentTransaction> {
    return this.service.create(body, user)
  }

  /**
   * Get investment transaction by ID
   *
   * @param id - Investment transaction ID
   * @param user - User
   * @returns Investment transaction
   */
  @Get(':id')
  @UseAuth()
  @ApiOkResponse({ type: InvestmentTransaction })
  get(@Param('id') id: string, @UseUser() user: User): Promise<InvestmentTransaction> {
    return this.service.get(id, user)
  }

  /**
   * Update investment transaction
   *
   * @param id - Investment transaction ID
   * @param body - Investment transaction data
   * @param user - User
   * @returns Updated investment transaction
   */
  @Put(':id')
  @UseAuth()
  @ApiOkResponse({ type: InvestmentTransaction })
  update(
    @Param('id') id: string,
    @Body() body: UpdateInvestmentTransactionDto,
    @UseUser() user: User,
  ): Promise<InvestmentTransaction> {
    return this.service.update(id, body, user)
  }

  /**
   * Delete investment transaction
   *
   * @param id - Investment transaction ID
   * @param user - User
   */
  @Delete(':id')
  @UseAuth()
  @ApiOkResponse()
  delete(@Param('id') id: string, @UseUser() user: User): Promise<void> {
    return this.service.delete(id, user)
  }
}
