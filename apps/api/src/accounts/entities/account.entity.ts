import { ApiProperty } from '@nestjs/swagger'
import { Account as PrismaAccount, AccountType } from '@prisma/client'

import { AccountCategory } from '@/account-categories/entities'
import { BaseEntityDto } from '@/common/dtos'

export class Account extends BaseEntityDto implements PrismaAccount {
  @ApiProperty()
  name: string

  @ApiProperty({ required: false })
  iban: string | null

  @ApiProperty({ enum: AccountType })
  type: AccountType

  @ApiProperty()
  user_id: string

  @ApiProperty({ required: false, type: () => [AccountCategory] })
  categories?: AccountCategory[]
}
