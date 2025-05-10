import { ApiProperty } from '@nestjs/swagger'
import { AssetType } from '@prisma/client'
import { IsEnum, IsOptional, IsString } from 'class-validator'

import { PaginateDto } from '@/common/dtos'

export class AssetListDto extends PaginateDto {
  @ApiProperty({ required: false, description: 'Filter by name (is possible to partial match)' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ required: false, enum: AssetType })
  @IsOptional()
  @IsEnum(AssetType)
  type?: AssetType

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  symbol?: string
}
