import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { CreateAccountCategoryDto, AccountCategoryListDto, UpdateAccountCategoryDto } from './dtos/requests'
import { AccountCategory } from './entities'
import { CrudService } from '@/common/services/crud.service'

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
