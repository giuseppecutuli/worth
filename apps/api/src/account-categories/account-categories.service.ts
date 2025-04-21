import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { CreateAccountCategoryDto, AccountCategoryListDto, UpdateAccountCategoryDto } from './dtos/requests'
import { User } from '@users/entities'
import { PaginatedDto } from '@common/dtos'
import { AccountCategory } from './entities'

@Injectable()
export class AccountCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * List account categories
   *
   * @param query - Query params
   * @param user - User
   * @returns Paginated account categories
   */
  async list(query: AccountCategoryListDto, user: User): Promise<PaginatedDto<AccountCategory>> {
    const where: Prisma.AccountCategoryWhereInput = {
      name: {
        contains: query.name,
      },
      user_id: user.id,
    }

    const orderBy: Prisma.AccountCategoryOrderByWithRelationInput = {
      [query.order.field]: query.order.direction,
    }

    const [count, data] = await Promise.all([
      this.prisma.accountCategory.count({ where }),
      this.prisma.accountCategory.findMany({
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
   * Get account category by ID
   *
   * @param id - Account category ID
   * @param user - User
   * @returns Account category
   * @throws NotFoundException
   */
  async get(id: string, user: User): Promise<AccountCategory> {
    const category = await this.prisma.accountCategory.findUnique({ where: { id, user_id: user.id } })

    if (!category) {
      throw new NotFoundException()
    }

    return category
  }

  /**
   * Create a new account category
   *
   * @param data - Account category data
   * @param user - User
   * @returns Created account category
   */
  async create(data: CreateAccountCategoryDto, user: User): Promise<AccountCategory> {
    const category = await this.prisma.accountCategory.create({
      data: {
        ...data,
        user_id: user.id,
      },
    })

    return category
  }

  /**
   * Update an account category
   *
   * @param id - Account category ID
   * @param data - Account category data
   * @param user - User
   * @returns Updated account category
   * @throws NotFoundException
   */
  async update(id: string, data: UpdateAccountCategoryDto, user: User): Promise<AccountCategory> {
    const category = await this.prisma.accountCategory.update({
      where: { id, user_id: user.id },
      data,
    })

    if (!category) {
      throw new NotFoundException()
    }

    return category
  }

  /**
   * Delete an account category
   *
   * @param id - Account category ID
   * @param user - User
   */
  async delete(id: string, user: User): Promise<void> {
    await this.prisma.accountCategory.delete({ where: { id, user_id: user.id } })
  }
}
