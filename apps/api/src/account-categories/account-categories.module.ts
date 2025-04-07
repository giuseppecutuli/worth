import { Module } from '@nestjs/common'
import { AccountCategoriesController } from './account-categories.controller'
import { AccountCategoriesService } from './account-categories.service'

@Module({
  controllers: [AccountCategoriesController],
  providers: [AccountCategoriesService],
  exports: [],
})
export class AccountCategoriesModule {}
