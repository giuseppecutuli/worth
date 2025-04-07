import { Controller } from '@nestjs/common'
import { AccountCategoriesService } from './account-categories.service'

@Controller('account-categories')
export class AccountCategoriesController {
  constructor(private readonly service: AccountCategoriesService) {}

  create() {
    return this.service.create()
  }
}
