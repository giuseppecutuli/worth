import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateAccountDto } from './dtos/requests/create.dto'
import { User } from '@users/entities'
import { UseAuth, UseUser } from '@auth/decorators'
import { AccountsService } from './accounts.service'

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly service: AccountsService) {}

  @Post()
  @UseAuth()
  create(@Body() body: CreateAccountDto, @UseUser() user: User) {
    return this.service.create(body, user)
  }
}
