import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { AccountCategoryListDto, CreateAccountCategoryDto } from './dtos/requests'
import { AccountCategoriesService } from './account-categories.service'
import { UseAuth, UseUser } from '@auth/decorators'
import { User } from '@users/entities'
import { ApiPaginatedResponse } from '@common/utils/swagger'
import { AccountCategory } from './entities'
import { ApiOkResponse } from '@nestjs/swagger'
import { UpdateAccountCategoryDto } from './dtos/requests/update.dto'

@Controller('account-categories')
export class AccountCategoriesController {
  constructor(private readonly service: AccountCategoriesService) {}

  @Get()
  @UseAuth()
  @ApiPaginatedResponse(AccountCategory)
  list(@Query() query: AccountCategoryListDto, @UseUser() user: User) {
    return this.service.list(query, user)
  }

  @Get(':id')
  @UseAuth()
  @ApiOkResponse({ type: AccountCategory })
  get(@Param('id') id: string, @UseUser() user: User) {
    return this.service.get(id, user)
  }

  @Post()
  @UseAuth()
  @ApiOkResponse({ type: AccountCategory })
  create(@Body() body: CreateAccountCategoryDto, @UseUser() user: User) {
    return this.service.create(body, user)
  }

  @Put(':id')
  @UseAuth()
  @ApiOkResponse({ type: AccountCategory })
  update(@Param('id') id: string, @Body() body: UpdateAccountCategoryDto, @UseUser() user: User) {
    return this.service.update(id, body, user)
  }

  @Delete(':id')
  @UseAuth()
  @ApiOkResponse()
  delete(@Param('id') id: string, @UseUser() user: User) {
    return this.service.delete(id, user)
  }
}
