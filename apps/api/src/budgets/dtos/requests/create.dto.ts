import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'

import { ExistOnDb } from '@/prisma/decorators/exist-on-db.decorator'

export class CreateBudgetDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  start_date: Date

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  end_date: Date

  @ApiProperty()
  @IsNumber()
  amount: number

  @ApiProperty({ required: false })
  @IsUUID(undefined, { each: true })
  @IsArray()
  @ArrayMinSize(1)
  @ExistOnDb({ entity: 'transactionCategory', field: 'id' })
  categories: string[]
}
