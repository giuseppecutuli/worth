import { ApiProperty } from '@nestjs/swagger'
import {
  InvestmentTransaction as PrismaInvestmentTransaction,
  InvestmentTransactionType,
  Prisma,
} from '@prisma/client'

import { BaseEntityDto } from '@/common/dtos'

export class InvestmentTransaction extends BaseEntityDto implements PrismaInvestmentTransaction {
  @ApiProperty({ enum: InvestmentTransactionType })
  type: InvestmentTransactionType

  @ApiProperty()
  quantity: Prisma.Decimal

  @ApiProperty()
  price: Prisma.Decimal

  @ApiProperty()
  date: Date

  @ApiProperty()
  asset_id: string

  @ApiProperty()
  account_id: string

  @ApiProperty()
  user_id: string
}
