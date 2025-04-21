import { ApiProperty } from '@nestjs/swagger'
import { AssetType } from '@prisma/client'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class UpdateAssetDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  symbol?: string

  @ApiProperty({ enum: AssetType, required: false })
  @IsEnum(AssetType)
  @IsOptional()
  type?: AssetType
}
