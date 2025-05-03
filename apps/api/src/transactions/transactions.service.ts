import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateTransactionDto, TransactionListDto, UpdateTransactionDto } from './dtos/requests'
import { Transaction } from './entities'
import { Prisma } from '@prisma/client'
import { CrudService } from '@/common/services/crud.service'

/**
 * Service for transactions
 * @extends CrudService
 */
@Injectable()
export class TransactionsService extends CrudService<Transaction, CreateTransactionDto, UpdateTransactionDto, TransactionListDto> {
  constructor(prisma: PrismaService) {
    super(prisma, 'Transaction')
  }

  /**
   * Build the where clause for the list query
   *
   * @param query - Query params
   * @returns {object} - The where clause
   */
  protected buildWhere(query: TransactionListDto): Prisma.TransactionWhereInput {
    return {
      account_id: query.account_id,
      type: query.type,
      date: {
        gte: query.from_date,
        lte: query.to_date,
      },
      categories: {
        some: {
          category_id: {
            in: query.categories,
          },
        },
      },
      amount: {
        gte: query.min_amount,
        lte: query.max_amount,
      },
      currency: query.currency,
    }
  }

  /**
   * Build the create data for the create query
   *
   * @param data - Create data
   * @returns {object} - The create data
   */
  protected buildCreateData(data: CreateTransactionDto) {
    return {
      ...data,
      categories: {
        create: data.categories?.map((id) => ({
          category_id: id,
        })),
      },
    }
  }

  /**
   * Build the update data for the update query
   *
   * @param data - Update data
   * @returns {object} - The update data
   */
  protected buildUpdateData(data: UpdateTransactionDto) {
    return {
      ...data,
      categories: {
        deleteMany: {},
        create: data.categories?.map((id) => ({
          category_id: id,
        })),
      },
    }
  }
}
