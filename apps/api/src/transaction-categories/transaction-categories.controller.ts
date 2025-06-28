import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { UseAuth, UseUser } from '@/auth/decorators'
import { ApiPaginatedResponse } from '@/common/utils/swagger'
import { User } from '@/users/entities'

import {
  CreateTransactionCategoryDto,
  TransactionCategoryListDto,
  UpdateTransactionCategoryDto,
} from './dtos/requests'
import { TransactionCategory } from './entities'
import { TransactionCategoriesService } from './transaction-categories.service'

@Controller('transaction-categories')
export class TransactionCategoriesController {
  constructor(private readonly service: TransactionCategoriesService) {}

  @Get()
  @UseAuth()
  @ApiPaginatedResponse(TransactionCategory)
  list(@Query() query: TransactionCategoryListDto, @UseUser() user: User) {
    return this.service.list(query, user)
  }

  @Get(':id')
  @UseAuth()
  @ApiOkResponse({ type: TransactionCategory })
  get(@Param('id') id: string, @UseUser() user: User) {
    return this.service.get(id, user)
  }

  @Post()
  @UseAuth()
  @ApiOkResponse({ type: TransactionCategory })
  create(@Body() body: CreateTransactionCategoryDto, @UseUser() user: User) {
    return this.service.create(body, user)
  }

  @Put(':id')
  @UseAuth()
  @ApiOkResponse({ type: TransactionCategory })
  update(
    @Param('id') id: string,
    @Body() body: UpdateTransactionCategoryDto,
    @UseUser() user: User,
  ) {
    return this.service.update(id, body, user)
  }

  @Delete(':id')
  @UseAuth()
  @ApiOkResponse()
  delete(@Param('id') id: string, @UseUser() user: User) {
    return this.service.delete(id, user)
  }
}
