import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { CrudService } from '@/common/services/crud.service'
import { PrismaService } from '@/prisma/prisma.service'

import { CreateInvestmentTransactionDto, InvestmentTransactionListDto, UpdateInvestmentTransactionDto } from './dtos/requests'
import { InvestmentTransaction } from './entities'

/**
 * Service for investment transactions
 * @extends CrudService
 */
@Injectable()
export class InvestmentTransactionsService extends CrudService<
  InvestmentTransaction,
  CreateInvestmentTransactionDto,
  UpdateInvestmentTransactionDto,
  InvestmentTransactionListDto
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'InvestmentTransaction')
  }

  /**
   * Build the where clause for the list query
   *
   * @param query - Query params
   * @returns {object} - The where clause
   */
  protected buildWhere(query: InvestmentTransactionListDto): Prisma.InvestmentTransactionWhereInput {
    return {
      account_id: query.account_id,
      asset_id: query.asset_id,
      type: query.type,
      date: {
        gte: query.from_date,
        lte: query.to_date,
      },
      price: {
        gte: query.min_price,
        lte: query.max_price,
      },
    }
  }
}
