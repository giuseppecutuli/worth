import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { UseAuth, UseUser } from '@/auth/decorators'
import { PaginatedDto } from '@/common/dtos'
import { ApiPaginatedResponse } from '@/common/utils/swagger'
import { User } from '@/users/entities'

import { AccountsService } from './accounts.service'
import { AccountListDto, UpdateAccountDto } from './dtos/requests'
import { CreateAccountDto } from './dtos/requests/create.dto'
import { Account } from './entities'

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly service: AccountsService) {}

  /**
   * List accounts
   *
   * @param query - Query params
   * @param user - User
   * @returns Paginated accounts
   */
  @Get()
  @UseAuth()
  @ApiPaginatedResponse(Account)
  list(@Query() query: AccountListDto, @UseUser() user: User): Promise<PaginatedDto<Account>> {
    return this.service.list(query, user)
  }

  /**
   * Get a account by ID
   *
   * @param id - Account ID
   * @param user - User
   * @returns Account
   */
  @Get(':id')
  @UseAuth()
  @ApiOkResponse({ type: Account })
  get(@Param('id') id: string, @UseUser() user: User) {
    return this.service.get(id, user)
  }

  /**
   * Create an account
   *
   * @param body - Account data
   * @param user - User
   * @returns Created account
   */
  @Post()
  @UseAuth()
  @ApiOkResponse({ type: Account })
  create(@Body() body: CreateAccountDto, @UseUser() user: User): Promise<Account> {
    return this.service.create(body, user)
  }

  /**
   * Update an account
   *
   * @param id - Account ID
   * @param body - Account data
   * @param user - User
   * @returns Updated account
   */
  @Put(':id')
  @UseAuth()
  @ApiOkResponse({ type: Account })
  update(
    @Param('id') id: string,
    @Body() body: UpdateAccountDto,
    @UseUser() user: User,
  ): Promise<Account> {
    return this.service.update(id, body, user)
  }

  /**
   * Delete an account
   *
   * @param id - Account ID
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
