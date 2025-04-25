import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { TransactionCategoryListDto, CreateTransactionCategoryDto, UpdateTransactionCategoryDto } from './dtos/requests'
import { TransactionCategoriesService } from './transaction-categories.service'
import { UseAuth, UseUser } from '@/auth/decorators'
import { User } from '@/users/entities'
import { ApiPaginatedResponse } from '@/common/utils/swagger'
import { TransactionCategory } from './entities'
import { ApiOkResponse } from '@nestjs/swagger'

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
  update(@Param('id') id: string, @Body() body: UpdateTransactionCategoryDto, @UseUser() user: User) {
    return this.service.update(id, body, user)
  }

  @Delete(':id')
  @UseAuth()
  @ApiOkResponse()
  delete(@Param('id') id: string, @UseUser() user: User) {
    return this.service.delete(id, user)
  }
}
