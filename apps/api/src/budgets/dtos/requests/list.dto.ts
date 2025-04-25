import { OrderQuery } from '@/common/decorators'
import { DEFAULT_ORDER, DEFAULT_ORDER_FIELDS, OrderDto, PaginateDto } from '@/common/dtos'
import { ApiProperty } from '@nestjs/swagger'
import { ExistOnDb } from '@/prisma/decorators/exist-on-db.decorator'
import { IsArray, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class BudgetListDto extends PaginateDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  min_amount?: number

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  max_amount?: number

  @ApiProperty({ required: false })
  @IsUUID(undefined, { each: true })
  @IsArray()
  @IsOptional()
  @ExistOnDb({ entity: 'transactionCategory', field: 'id' })
  categories?: string[]

  @OrderQuery([...DEFAULT_ORDER_FIELDS, 'amount', 'start_date', 'end_date'])
  order: OrderDto = DEFAULT_ORDER
}
