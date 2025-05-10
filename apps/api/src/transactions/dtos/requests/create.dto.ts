import { ApiProperty } from '@nestjs/swagger'
import { Currency, TransactionType } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

import { ExistOnDb } from '@/prisma/decorators/exist-on-db.decorator'

export class CreateTransactionDto {
  @ApiProperty()
  @IsNumber()
  amount: number

  @ApiProperty({ enum: Currency, default: Currency.EUR })
  @IsEnum(Currency)
  @IsOptional()
  currency: Currency = Currency.EUR

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  type: TransactionType

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date

  @ApiProperty({ required: false, isArray: true })
  @IsUUID(undefined, { each: true })
  @IsArray()
  @IsOptional()
  @ExistOnDb({ entity: 'transactionCategory', field: 'id' })
  categories?: string[]

  @ApiProperty()
  @IsUUID()
  @ExistOnDb({ entity: 'account', field: 'id' })
  account_id: string
}
