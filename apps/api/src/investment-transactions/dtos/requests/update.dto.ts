import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsEnum, IsNumber, IsOptional, IsUUID, Min } from 'class-validator'
import { ExistOnDb } from '@/prisma/decorators/exist-on-db.decorator'
import { InvestmentTransactionType } from '@prisma/client'
import { Type } from 'class-transformer'

export class UpdateInvestmentTransactionDto {
  @ApiProperty({ enum: InvestmentTransactionType, required: false })
  @IsEnum(InvestmentTransactionType)
  type?: InvestmentTransactionType

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Min(1)
  quantity?: number

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  price?: number

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date?: Date

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  @ExistOnDb({ entity: 'asset', field: 'id' })
  asset_id?: string

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  @ExistOnDb({ entity: 'account', field: 'id' })
  account_id?: string
}
