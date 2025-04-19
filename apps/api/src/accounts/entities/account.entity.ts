import { BaseEntityDto } from '@common/dtos'
import { ApiProperty } from '@nestjs/swagger'
import { AccountType, Account as PrismaAccount } from '@prisma/client'

export class Account extends BaseEntityDto implements PrismaAccount {
  @ApiProperty()
  name: string

  @ApiProperty({ required: false })
  iban: string | null

  @ApiProperty({ enum: AccountType })
  type: AccountType

  @ApiProperty()
  user_id: string
}
