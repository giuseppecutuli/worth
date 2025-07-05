import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString, Max, Min } from 'class-validator'

import { OrderQuery } from '@/common/decorators/order-query.decorator'
import { SortDirection } from '@/common/types'

import { OrderDto } from './order.dto'

export const DEFAULT_ORDER_FIELDS: string[] = ['created_at', 'updated_at']

export const DEFAULT_ORDER: OrderDto = {
  field: 'created_at',
  direction: SortDirection.ASC,
}

export class PaginateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Min(0)
  page: number = 0

  @ApiProperty({ required: false })
  @IsOptional()
  @Max(100)
  limit: number = 10

  @OrderQuery(DEFAULT_ORDER_FIELDS)
  order: OrderDto = DEFAULT_ORDER

  @ApiProperty({ required: false, description: 'Include related entities' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  include?: string[]
}
