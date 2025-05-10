import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { CrudService } from '@/common/services/crud.service'
import { PrismaService } from '@/prisma/prisma.service'

import { BudgetListDto, CreateBudgetDto, UpdateBudgetDto } from './dtos/requests'
import { Budget } from './entities'

/**
 * Service for budgets
 * @extends CrudService
 */
@Injectable()
export class BudgetsService extends CrudService<Budget, CreateBudgetDto, UpdateBudgetDto, BudgetListDto> {
  constructor(prisma: PrismaService) {
    super(prisma, 'Budget')
  }

  /**
   * Build the where clause for the list query
   *
   * @param query - Query params
   * @returns {object} - The where clause
   */
  protected buildWhere(query: BudgetListDto): Prisma.BudgetWhereInput {
    return {
      name: {
        contains: query.name,
      },
      amount: {
        gte: query.min_amount,
        lte: query.max_amount,
      },
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
  protected buildCreateData(data: CreateBudgetDto) {
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
  protected buildUpdateData(data: UpdateBudgetDto) {
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
