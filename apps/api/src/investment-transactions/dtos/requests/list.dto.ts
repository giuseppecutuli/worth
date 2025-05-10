import { ApiProperty } from '@nestjs/swagger'
import { InvestmentTransactionType } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator'

import { PaginateDto } from '@/common/dtos'
import { ExistOnDb } from '@/prisma/decorators/exist-on-db.decorator'

export class InvestmentTransactionListDto extends PaginateDto {
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  @ExistOnDb({ entity: 'account', field: 'id' })
  account_id?: string

  @ApiProperty({ enum: InvestmentTransactionType, required: false })
  @IsEnum(InvestmentTransactionType)
  @IsOptional()
  type?: InvestmentTransactionType

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

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  @ExistOnDb({ entity: 'asset', field: 'id' })
  asset_id?: string

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  min_price?: number

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  max_price?: number
}
