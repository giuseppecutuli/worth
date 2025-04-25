import { ApiProperty } from '@nestjs/swagger'
import { TransactionCategory as PrismaTransactionCategory } from '@prisma/client'
import { BaseEntityDto } from '@/common/dtos'

export class TransactionCategory extends BaseEntityDto implements PrismaTransactionCategory {
  @ApiProperty()
  name: string

  @ApiProperty()
  user_id: string
}
