import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { User } from '@/users/entities'
import { BudgetListDto, CreateBudgetDto, UpdateBudgetDto } from './dtos/requests'
import { Prisma } from '@prisma/client'
import { PaginatedDto } from '@/common/dtos'
import { Budget } from './entities'

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * List budgets
   *
   * @param query - Query params
   * @param user - User
   * @returns List of budgets
   */
  async list(query: BudgetListDto, user: User): Promise<PaginatedDto<Budget>> {
    const where: Prisma.BudgetWhereInput = {
      user_id: user.id,
      name: {
        contains: query.name,
      },
      amount: {
        gte: query.min_amount,
        lte: query.max_amount,
      },
      categories: {
        some: {
          category_id: {
            in: query.categories,
          },
        },
      },
    }

    const orderBy: Prisma.BudgetOrderByWithRelationInput = {
      [query.order.field]: query.order.direction,
    }

    const [count, data] = await Promise.all([
      this.prisma.budget.count({ where }),
      this.prisma.budget.findMany({
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
   * Get budget by ID
   *
   * @param id - Budget ID
   * @param user - User
   * @returns Budget
   */
  async get(id: string, user: User): Promise<Budget> {
    const budget = await this.prisma.budget.findUnique({
      where: {
        id,
        user_id: user.id,
      },
    })

    if (!budget) {
      throw new NotFoundException()
    }

    return budget
  }

  /**
   * Create an budget
   *
   * @param data - Budget data
   * @param user - User
   * @returns Created budget
   */
  async create(data: CreateBudgetDto, user: User): Promise<Budget> {
    const budget = await this.prisma.budget.create({
      data: {
        ...data,
        categories: {
          create: data.categories?.map((id) => ({
            category_id: id,
          })),
        },
        user_id: user.id,
      },
    })

    return budget
  }

  /**
   * Update an budget
   *
   * @param id - Budget ID
   * @param data - Budget data
   * @param user - User
   * @returns Updated budget
   */
  async update(id: string, data: UpdateBudgetDto, user: User): Promise<Budget> {
    const budget = await this.prisma.budget.update({
      where: {
        id,
        user_id: user.id,
      },
      data: {
        ...data,
        categories: {
          deleteMany: {},
          create: data.categories?.map((id) => ({
            category_id: id,
          })),
        },
      },
    })

    if (!budget) {
      throw new NotFoundException()
    }

    return budget
  }

  /**
   * Delete an budget
   *
   * @param id - Budget ID
   * @param user - User
   */
  async delete(id: string, user: User): Promise<void> {
    await this.prisma.budget.delete({ where: { id, user_id: user.id } })
  }
}
