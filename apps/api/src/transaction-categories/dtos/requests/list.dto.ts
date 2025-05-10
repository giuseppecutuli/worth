import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

import { PaginateDto } from '@/common/dtos'

export class TransactionCategoryListDto extends PaginateDto {
  @ApiProperty({ required: false, description: 'Filter by name (is possible to partial match)' })
  @IsString()
  @IsOptional()
  name: string
}
