import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { AccountCategoryListDto, CreateAccountCategoryDto, UpdateAccountCategoryDto } from './dtos/requests'
import { AccountCategoriesService } from './account-categories.service'
import { UseAuth, UseUser } from '@/auth/decorators'
import { User } from '@/users/entities'
import { ApiPaginatedResponse } from '@/common/utils/swagger'
import { AccountCategory } from './entities'
import { ApiOkResponse } from '@nestjs/swagger'

@Controller('account-categories')
export class AccountCategoriesController {
  constructor(private readonly service: AccountCategoriesService) {}

  /**
   * List account categories
   *
   * @param query - Query params
   * @param user - User
   * @returns Paginated account categories
   */
  @Get()
  @UseAuth()
  @ApiPaginatedResponse(AccountCategory)
  list(@Query() query: AccountCategoryListDto, @UseUser() user: User) {
    return this.service.list(query, user)
  }

  /**
   * Get account category by ID
   *
   * @param id - Account category ID
   * @param user - User
   * @returns Account category
   */
  @Get(':id')
  @UseAuth()
  @ApiOkResponse({ type: AccountCategory })
  get(@Param('id') id: string, @UseUser() user: User) {
    return this.service.get(id, user)
  }

  /**
   * Create account category
   *
   * @param body - Account category data
   * @param user - User
   * @returns Created account category
   */
  @Post()
  @UseAuth()
  @ApiOkResponse({ type: AccountCategory })
  create(@Body() body: CreateAccountCategoryDto, @UseUser() user: User) {
    return this.service.create(body, user)
  }

  /**
   * Update account category
   *
   * @param id - Account category ID
   * @param body - Account category data
   * @param user - User
   * @returns Updated account category
   */
  @Put(':id')
  @UseAuth()
  @ApiOkResponse({ type: AccountCategory })
  update(@Param('id') id: string, @Body() body: UpdateAccountCategoryDto, @UseUser() user: User) {
    return this.service.update(id, body, user)
  }

  /**
   * Delete account category
   *
   * @param id - Account category ID
   * @param user - User
   * @returns Deleted account category
   */
  @Delete(':id')
  @UseAuth()
  @ApiOkResponse()
  delete(@Param('id') id: string, @UseUser() user: User) {
    return this.service.delete(id, user)
  }
}
