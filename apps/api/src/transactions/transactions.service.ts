import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { CreateTransactionDto } from './dtos/create.dto'
import { User } from '@users/entities'

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTransactionDto, user: User) {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...data,
        user_id: user.id,
        categories: {
          create: data.categories.map((id) => ({
            category_id: id,
          })),
        },
      },
    })

    return transaction
  }
}
