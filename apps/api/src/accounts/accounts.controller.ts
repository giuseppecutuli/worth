import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CreateAccountDto } from './dtos/requests/create.dto'
import { User } from '@users/entities'
import { UseAuth, UseUser } from '@auth/decorators'
import { AccountsService } from './accounts.service'
import { Account } from './entities'
import { ApiPaginatedResponse } from '@common/utils/swagger'
import { AccountListDto } from './dtos/requests'
import { PaginatedDto } from '@common/dtos'

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
}
