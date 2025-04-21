import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { CreateAccountDto } from './dtos/requests/create.dto'
import { User } from '@users/entities'
import { AccountListDto, UpdateAccountDto } from './dtos/requests'
import { Prisma } from '@prisma/client'
import { PaginatedDto } from '@common/dtos'
import { Account } from './entities'

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * List accounts
   *
   * @param query - Query params
   * @param user - User
   * @returns List of accounts
   */
  async list(query: AccountListDto, user: User): Promise<PaginatedDto<Account>> {
    const where: Prisma.AccountWhereInput = {
      user_id: user.id,
      name: {
        contains: query.name,
      },
      type: query.type,
      categories: {
        some: {
          category_id: {
            in: query.categories,
          },
        },
      },
    }

    const [count, data] = await Promise.all([
      this.prisma.account.count({ where }),
      this.prisma.account.findMany({
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
   * Get account by ID
   *
   * @param id - Account ID
   * @param user - User
   * @returns Account
   */
  async get(id: string, user: User): Promise<Account> {
    const account = await this.prisma.account.findUnique({
      where: {
        id,
        user_id: user.id,
      },
    })

    if (!account) {
      throw new NotFoundException()
    }

    return account
  }

  /**
   * Create an account
   *
   * @param data - Account data
   * @param user - User
   * @returns Created account
   */
  async create(data: CreateAccountDto, user: User): Promise<Account> {
    const account = await this.prisma.account.create({
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

    return account
  }

  /**
   * Update an account
   *
   * @param id - Account ID
   * @param data - Account data
   * @param user - User
   * @returns Updated account
   */
  async update(id: string, data: UpdateAccountDto, user: User): Promise<Account> {
    const account = await this.prisma.account.update({
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

    if (!account) {
      throw new NotFoundException()
    }

    return account
  }

  async delete(id: string, user: User): Promise<void> {
    await this.prisma.account.delete({ where: { id, user_id: user.id } })
  }
}
