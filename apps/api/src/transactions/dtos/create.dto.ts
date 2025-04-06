import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsDecimal, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'
import { ExistOnDb } from '@prisma/decorators/exist-on-db.decorator'
import { Currency, TransactionType } from '@prisma/client'

export class CreateTransactionDto {
  @ApiProperty()
  @IsDecimal()
  amount: number

  @ApiProperty({ enum: Currency })
  @IsEnum(Currency)
  currency: Currency

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  type: TransactionType

  @ApiProperty()
  @IsDate()
  date: Date

  @ApiProperty()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  @ExistOnDb({ entity: 'transactionCategory', field: 'id' })
  categories: string[]

  @ApiProperty()
  @IsUUID()
  @ExistOnDb({ entity: 'account', field: 'id' })
  account_id: string
}
