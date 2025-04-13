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

  async list(query: TransactionCategoryListDto, user: User): Promise<PaginatedDto<TransactionCategory>> {
    const where: Prisma.TransactionCategoryWhereInput = {
      name: {
        contains: query.name,
      },
      user_id: user.id,
    }

    const [count, data] = await Promise.all([
      this.prisma.transactionCategory.count({ where }),
      this.prisma.transactionCategory.findMany({
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

  async get(id: string, user: User): Promise<TransactionCategory> {
    const category = await this.prisma.transactionCategory.findUnique({ where: { id, user_id: user.id } })

    if (!category) {
      throw new NotFoundException()
    }

    return category
  }

  async create(data: CreateTransactionCategoryDto, user: User): Promise<TransactionCategory> {
    const category = await this.prisma.transactionCategory.create({
      data: {
        ...data,
        user_id: user.id,
      },
    })

    return category
  }

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

  async delete(id: string, user: User): Promise<void> {
    await this.prisma.transactionCategory.delete({ where: { id, user_id: user.id } })
  }
}
