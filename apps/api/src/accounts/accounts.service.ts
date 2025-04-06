import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { CreateAccountDto } from './dtos/requests/create.dto'
import { User } from '@users/entities'

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAccountDto, user: User) {
    const account = await this.prisma.account.create({
      data: {
        ...data,
        categories: {
          create: data.categories.map((id) => ({
            category_id: id,
          })),
        },
        user_id: user.id,
      },
    })

    return account
  }
}
