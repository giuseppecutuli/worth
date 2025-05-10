import { ApiProperty } from '@nestjs/swagger'
import { Currency, Prisma, Transaction as PrismaTransaction, TransactionType } from '@prisma/client'

import { BaseEntityDto } from '@/common/dtos'

export class Transaction extends BaseEntityDto implements PrismaTransaction {
  @ApiProperty()
  amount: Prisma.Decimal

  @ApiProperty({ enum: Currency })
  currency: Currency

  @ApiProperty()
  description: string

  @ApiProperty({ enum: TransactionType })
  type: TransactionType

  @ApiProperty()
  date: Date

  @ApiProperty({ required: false })
  account_id: string | null

  @ApiProperty()
  user_id: string
}
