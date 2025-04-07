import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { CreateAccountCategoryDto, AccountCategoryListDto } from './dtos/requests'
import { User } from '@users/entities'
import { PaginatedDto } from '@common/dtos'
import { AccountCategory } from './entities'

@Injectable()
export class AccountCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: AccountCategoryListDto, user: User): Promise<PaginatedDto<AccountCategory>> {
    const where: Prisma.AccountCategoryWhereInput = {
      name: {
        contains: query.name,
      },
      user_id: user.id,
    }

    const [count, data] = await Promise.all([
      this.prisma.accountCategory.count({ where }),
      this.prisma.accountCategory.findMany({
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

  async get(id: string, user: User): Promise<AccountCategory> {
    const category = await this.prisma.accountCategory.findUnique({ where: { id, user_id: user.id } })

    if (!category) {
      throw new NotFoundException()
    }

    return category
  }

  async create(data: CreateAccountCategoryDto, user: User): Promise<AccountCategory> {
    const category = await this.prisma.accountCategory.create({
      data: {
        ...data,
        user_id: user.id,
      },
    })

    return category
  }

  async update(id: string, data: CreateAccountCategoryDto, user: User): Promise<AccountCategory> {
    const category = await this.prisma.accountCategory.update({
      where: { id, user_id: user.id },
      data,
    })

    if (!category) {
      throw new NotFoundException()
    }

    return category
  }

  async delete(id: string, user: User): Promise<void> {
    await this.prisma.accountCategory.delete({ where: { id, user_id: user.id } })
  }
}
