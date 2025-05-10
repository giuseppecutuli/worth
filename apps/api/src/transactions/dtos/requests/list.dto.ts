import { ApiProperty } from '@nestjs/swagger'
import { Currency, TransactionType } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator'

import { PaginateDto } from '@/common/dtos'
import { ExistOnDb } from '@/prisma/decorators/exist-on-db.decorator'

export class TransactionListDto extends PaginateDto {
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  @ExistOnDb({ entity: 'account', field: 'id' })
  account_id?: string

  @ApiProperty({ enum: TransactionType, required: false })
  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType

  @ApiProperty({ required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  from_date?: Date

  @ApiProperty({ required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  to_date?: Date

  @ApiProperty({ required: false, isArray: true })
  @IsUUID(undefined, { each: true })
  @IsOptional()
  @IsArray()
  @ExistOnDb({ entity: 'transactionCategory', field: 'id' })
  categories?: string[]

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  min_amount?: number

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  max_amount?: number

  @ApiProperty({ required: false, enum: Currency })
  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency
}
