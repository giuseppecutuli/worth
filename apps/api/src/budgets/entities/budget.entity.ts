import { ApiProperty } from '@nestjs/swagger'
import { Budget as PrismaBudget, Prisma } from '@prisma/client'

import { BaseEntityDto } from '@/common/dtos'

export class Budget extends BaseEntityDto implements PrismaBudget {
  @ApiProperty()
  name: string

  @ApiProperty({ required: false })
  description: string | null

  @ApiProperty()
  start_date: Date

  @ApiProperty()
  end_date: Date

  @ApiProperty()
  amount: Prisma.Decimal

  @ApiProperty()
  user_id: string
}
