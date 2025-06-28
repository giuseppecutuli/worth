import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { UseAuth, UseUser } from '@/auth/decorators'
import { PaginatedDto } from '@/common/dtos'
import { ApiPaginatedResponse } from '@/common/utils/swagger'
import { User } from '@/users/entities'

import { BudgetsService } from './budgets.service'
import { BudgetListDto, CreateBudgetDto, UpdateBudgetDto } from './dtos/requests'
import { Budget } from './entities'

@ApiTags('Budgets')
@Controller('budgets')
export class BudgetsController {
  constructor(private readonly service: BudgetsService) {}

  /**
   * List budgets
   *
   * @param query - Query params
   * @param user - User
   * @returns Paginated budgets
   */
  @Get()
  @UseAuth()
  @ApiPaginatedResponse(Budget)
  list(@Query() query: BudgetListDto, @UseUser() user: User): Promise<PaginatedDto<Budget>> {
    return this.service.list(query, user)
  }

  /**
   * Get a budget by ID
   *
   * @param id - Budget ID
   * @param user - User
   * @returns Budget
   */
  @Get(':id')
  @UseAuth()
  @ApiOkResponse({ type: Budget })
  get(@Param('id') id: string, @UseUser() user: User) {
    return this.service.get(id, user)
  }

  /**
   * Create an budget
   *
   * @param body - Budget data
   * @param user - User
   * @returns Created budget
   */
  @Post()
  @UseAuth()
  @ApiOkResponse({ type: Budget })
  create(@Body() body: CreateBudgetDto, @UseUser() user: User): Promise<Budget> {
    return this.service.create(body, user)
  }

  /**
   * Update an budget
   *
   * @param id - Budget ID
   * @param body - Budget data
   * @param user - User
   * @returns Updated budget
   */
  @Put(':id')
  @UseAuth()
  @ApiOkResponse({ type: Budget })
  update(
    @Param('id') id: string,
    @Body() body: UpdateBudgetDto,
    @UseUser() user: User,
  ): Promise<Budget> {
    return this.service.update(id, body, user)
  }

  /**
   * Delete an budget
   *
   * @param id - Budget ID
   * @param user - User
   * @returns Success message
   */
  @Delete(':id')
  @UseAuth()
  @ApiOkResponse()
  delete(@Param('id') id: string, @UseUser() user: User) {
    return this.service.delete(id, user)
  }
}
