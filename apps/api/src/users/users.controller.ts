import { Body, Controller, Delete, Param, Put } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { UseAuth, UseUser } from '@/auth/decorators'
import { User } from '@/users/entities'

import { UpdateUserDto } from './dtos/requests'
import { UsersService } from './users.services'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  /**
   * Update user
   *
   * @param id - User ID
   * @param body - User data
   * @param user - User
   * @returns Updated user
   */
  @Put(':id')
  @UseAuth()
  @ApiOkResponse({ type: User })
  update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @UseUser() user: User,
  ): Promise<User> {
    console.log('body', body)
    return this.service.update(id, body, user)
  }

  /**
   * Delete user
   *
   * @param id - User ID
   * @param user - User
   * @returns Deleted user
   */
  @Delete(':id')
  @UseAuth()
  @ApiOkResponse()
  delete(@Param('id') id: string, @UseUser() user: User): Promise<void> {
    return this.service.delete(id, user)
  }
}
