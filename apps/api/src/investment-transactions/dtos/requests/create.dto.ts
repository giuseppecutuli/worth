import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsEnum, IsNumber, IsUUID, Min } from 'class-validator'
import { ExistOnDb } from '@prisma/decorators/exist-on-db.decorator'
import { InvestmentTransactionType } from '@prisma/client'
import { Type } from 'class-transformer'

export class CreateInvestmentTransactionDto {
  @ApiProperty({ enum: InvestmentTransactionType })
  @IsEnum(InvestmentTransactionType)
  type: InvestmentTransactionType

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number

  @ApiProperty()
  @IsNumber()
  price: number

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date

  @ApiProperty()
  @IsUUID()
  @ExistOnDb({ entity: 'asset', field: 'id' })
  asset_id: string

  @ApiProperty()
  @IsUUID()
  @ExistOnDb({ entity: 'account', field: 'id' })
  account_id: string
}
