import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { CrudService } from '@/common/services/crud.service'
import { PrismaService } from '@/prisma/prisma.service'

import { AccountListDto, UpdateAccountDto } from './dtos/requests'
import { CreateAccountDto } from './dtos/requests/create.dto'
import { Account } from './entities'

/**
 * Service for accounts
 * @extends CrudService
 */
@Injectable()
export class AccountsService extends CrudService<Account, CreateAccountDto, UpdateAccountDto, AccountListDto> {
  constructor(prisma: PrismaService) {
    super(prisma, 'Account')
  }

  /**
   * Build the where clause for the list query
   *
   * @param query - Query params
   * @param user - User
   * @returns {object} - The where clause
   */
  protected buildWhere(query: AccountListDto): Prisma.AccountWhereInput {
    return {
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
  }

  /**
   * Build the create data for the create query
   *
   * @param data - Create data
   * @returns {object} - The create data
   */
  protected buildCreateData(data: CreateAccountDto) {
    return {
      ...data,
      categories: {
        create: data.categories?.map((id) => ({
          category_id: id,
        })),
      },
    }
  }

  /**
   * Build the update data for the update query
   *
   * @param data - Update data
   * @returns {object} - The update data
   */
  protected buildUpdateData(data: UpdateAccountDto) {
    return {
      ...data,
      categories: {
        deleteMany: {},
        create: data.categories?.map((id) => ({
          category_id: id,
        })),
      },
    }
  }
}
