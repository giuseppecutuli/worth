import { InvestmentTransactionType, Prisma, InvestmentTransaction as PrismaInvestmentTransaction } from '@prisma/client'
import { BaseEntityDto } from '@common/dtos'
import { ApiProperty } from '@nestjs/swagger'

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
