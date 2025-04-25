import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { ExistOnDb } from '@/prisma/decorators/exist-on-db.decorator'
import { Currency, TransactionType } from '@prisma/client'
import { Type } from 'class-transformer'

export class UpdateTransactionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  amount?: number

  @ApiProperty({ enum: Currency, required: false })
  @IsOptional()
  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ enum: TransactionType, required: false })
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date

  @ApiProperty({ required: false, isArray: true })
  @IsOptional()
  @IsUUID(undefined, { each: true })
  @IsArray()
  @IsOptional()
  @ExistOnDb({ entity: 'transactionCategory', field: 'id' })
  categories?: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  @ExistOnDb({ entity: 'account', field: 'id' })
  account_id?: string
}
