import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { CrudService } from '@/common/services/crud.service'
import { PrismaService } from '@/prisma/prisma.service'

import { CreateTransactionCategoryDto, TransactionCategoryListDto, UpdateTransactionCategoryDto } from './dtos/requests'
import { TransactionCategory } from './entities'

/**
 * Service for transaction categories
 * @extends CrudService
 */
@Injectable()
export class TransactionCategoriesService extends CrudService<
  TransactionCategory,
  CreateTransactionCategoryDto,
  UpdateTransactionCategoryDto,
  TransactionCategoryListDto
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'TransactionCategory')
  }

  /**
   * Build the where clause for the list query
   *
   * @param query - Query params
   * @returns {object} - The where clause
   */
  protected buildWhere(query: TransactionCategoryListDto): Prisma.TransactionCategoryWhereInput {
    return {
      name: {
        contains: query.name,
      },
    }
  }
}
