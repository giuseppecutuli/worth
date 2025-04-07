import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'

@Injectable()
export class AccountCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create() {}
}
