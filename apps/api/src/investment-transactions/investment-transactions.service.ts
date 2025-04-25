import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { User } from '@/users/entities'
import { CreateInvestmentTransactionDto, InvestmentTransactionListDto, UpdateInvestmentTransactionDto } from './dtos/requests'
import { InvestmentTransaction } from './entities'
import { PaginatedDto } from '@/common/dtos'
import { Prisma } from '@prisma/client'

@Injectable()
export class InvestmentTransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * List investment transactions
   *
   * @param query - Query params
   * @param user - User
   * @returns Paginated investment transactions
   */
  async list(query: InvestmentTransactionListDto, user: User): Promise<PaginatedDto<InvestmentTransaction>> {
    const where: Prisma.InvestmentTransactionWhereInput = {
      user_id: user.id,
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

    const orderBy: Prisma.InvestmentTransactionOrderByWithRelationInput = {
      [query.order.field]: query.order.direction,
    }

    const [count, data] = await Promise.all([
      this.prisma.investmentTransaction.count({ where }),
      this.prisma.investmentTransaction.findMany({
        where,
        orderBy,
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
   * Create a investment transaction
   *
   * @param data - Investment transaction data
   * @param user - User
   * @returns
   */
  async create(data: CreateInvestmentTransactionDto, user: User): Promise<InvestmentTransaction> {
    const investmentTransaction = await this.prisma.investmentTransaction.create({
      data: {
        ...data,
        user_id: user.id,
      },
    })

    return investmentTransaction
  }

  /**
   * Update a investment transaction
   *
   * @param id - Investment transaction ID
   * @param data - Investment transaction data
   * @param user - User
   * @returns  Investment transaction
   * @throws NotFoundException
   */
  async get(id: string, user: User): Promise<InvestmentTransaction> {
    const investmentTransaction = await this.prisma.investmentTransaction.findUnique({ where: { id, user_id: user.id } })

    if (!investmentTransaction) {
      throw new NotFoundException()
    }

    return investmentTransaction
  }

  /**
   * Update a investment transaction
   *
   * @param id - Investment transaction ID
   * @param data - Investment transaction data
   * @param user - User
   * @returns Investment transaction
   * @throws NotFoundException
   */
  async update(id: string, data: UpdateInvestmentTransactionDto, user: User): Promise<InvestmentTransaction> {
    const investmentTransaction = await this.prisma.investmentTransaction.update({
      where: { id, user_id: user.id },
      data,
    })

    if (!investmentTransaction) {
      throw new NotFoundException()
    }

    return investmentTransaction
  }

  /**
   * Delete a investment transaction
   *
   * @param id - Investment transaction ID
   * @param user - User
   * @returns Investment transaction
   */
  async delete(id: string, user: User): Promise<void> {
    await this.prisma.investmentTransaction.delete({
      where: { id, user_id: user.id },
    })
  }
}
