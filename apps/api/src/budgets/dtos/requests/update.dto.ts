import { ApiProperty } from '@nestjs/swagger'
import { ExistOnDb } from '@prisma/decorators/exist-on-db.decorator'
import { Type } from 'class-transformer'
import { IsArray, IsDate, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateBudgetDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  start_date?: Date

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  end_date?: Date

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  amount?: number

  @ApiProperty({ required: false })
  @IsUUID(undefined, { each: true })
  @IsArray()
  @IsOptional()
  @ExistOnDb({ entity: 'transactionCategory', field: 'id' })
  categories?: string[]
}
