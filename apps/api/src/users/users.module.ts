import { Module } from '@nestjs/common'

import { UsersController } from './users.controller'
import { UsersService } from './users.services'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
