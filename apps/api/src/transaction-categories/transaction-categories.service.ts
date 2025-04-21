import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { CreateTransactionCategoryDto, TransactionCategoryListDto, UpdateTransactionCategoryDto } from './dtos/requests'
import { User } from '@users/entities'
import { PaginatedDto } from '@common/dtos'
import { TransactionCategory } from './entities'

@Injectable()
export class TransactionCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * List transaction categories
   *
   * @param query - Query params
   * @param user - User
   * @returns Paginated transaction categories
   */
  async list(query: TransactionCategoryListDto, user: User): Promise<PaginatedDto<TransactionCategory>> {
    const where: Prisma.TransactionCategoryWhereInput = {
      name: {
        contains: query.name,
      },
      user_id: user.id,
    }

    const orderBy: Prisma.TransactionCategoryOrderByWithRelationInput = {
      [query.order.field]: query.order.direction,
    }

    const [count, data] = await Promise.all([
      this.prisma.transactionCategory.count({ where }),
      this.prisma.transactionCategory.findMany({
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
   * Get transaction category by ID
   *
   * @param id - Transaction category ID
   * @param user - User
   * @returns Transaction category
   * @throws NotFoundException
   */
  async get(id: string, user: User): Promise<TransactionCategory> {
    const category = await this.prisma.transactionCategory.findUnique({ where: { id, user_id: user.id } })

    if (!category) {
      throw new NotFoundException()
    }

    return category
  }

  /**
   * Create transaction category
   *
   * @param data - Transaction category data
   * @param user - User
   * @returns Created transaction category
   */
  async create(data: CreateTransactionCategoryDto, user: User): Promise<TransactionCategory> {
    const category = await this.prisma.transactionCategory.create({
      data: {
        ...data,
        user_id: user.id,
      },
    })

    return category
  }

  /**
   * Update transaction category
   *
   * @param id - Transaction category ID
   * @param data - Transaction category data
   * @param user - User
   * @returns Updated transaction category
   * @throws NotFoundException
   */
  async update(id: string, data: UpdateTransactionCategoryDto, user: User): Promise<TransactionCategory> {
    const category = await this.prisma.transactionCategory.update({
      where: { id, user_id: user.id },
      data,
    })

    if (!category) {
      throw new NotFoundException()
    }

    return category
  }

  /**
   * Delete transaction category
   *
   * @param id - Transaction category ID
   * @param user - User
   * @returns Deleted transaction category
   */
  async delete(id: string, user: User): Promise<void> {
    await this.prisma.transactionCategory.delete({ where: { id, user_id: user.id } })
  }
}
