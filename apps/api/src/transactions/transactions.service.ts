import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { CreateTransactionDto } from './dtos/create.dto'

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTransactionDto) {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...data,
        categories: {
          connect: data.categories.map((id) => ({ id })),
        },
      },
    })

    return transaction
  }
}
