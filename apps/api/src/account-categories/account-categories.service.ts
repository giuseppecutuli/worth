import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { CrudService } from '@/common/services/crud.service'
import { PrismaService } from '@/prisma/prisma.service'

import {
  AccountCategoryListDto,
  CreateAccountCategoryDto,
  UpdateAccountCategoryDto,
} from './dtos/requests'
import { AccountCategory } from './entities'

/**
 * Service for account categories
 * @extends CrudService
 */
@Injectable()
export class AccountCategoriesService extends CrudService<
  AccountCategory,
  CreateAccountCategoryDto,
  UpdateAccountCategoryDto,
  AccountCategoryListDto
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'AccountCategory')
  }

  /**
   * Build the where clause for the list query
   *
   * @param query - Query params
   * @returns {object} - The where clause
   */
  protected buildWhere(query: AccountCategoryListDto): Prisma.AccountCategoryWhereInput {
    return {
      name: {
        contains: query.name,
      },
    }
  }
}
