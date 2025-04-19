import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { User } from '@users/entities'
import { CreateTransactionDto, TransactionListDto } from './dtos/requests'
import { Transaction } from './entities'
import { PaginatedDto } from '@common/dtos'
import { Prisma } from '@prisma/client'

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * List transactions
   *
   * @param query - Query params
   * @param user - User
   * @returns Paginated transactions
   */
  async list(query: TransactionListDto, user: User): Promise<PaginatedDto<Transaction>> {
    const where: Prisma.TransactionWhereInput = {
      user_id: user.id,
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

    const [count, data] = await Promise.all([
      this.prisma.transaction.count({ where }),
      this.prisma.transaction.findMany({
        where,
        take: query.limit,
        skip: query.page * query.limit,
      }),
    ])

    return {
      data,
      count,
      limit: query.limit,
      page: query.page,
      total_pages: Math.ceil(count / query.limit),
    }
  }

  /**
   * Create a transaction
   *
   * @param data - Transaction data
   * @param user - User
   * @returns
   */
  async create(data: CreateTransactionDto, user: User): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...data,
        user_id: user.id,
        categories: {
          create: data.categories?.map((id) => ({
            category_id: id,
          })),
        },
      },
    })

    return transaction
  }
}
