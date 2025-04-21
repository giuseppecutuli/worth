import { ApiProperty } from '@nestjs/swagger'
import { AssetType } from '@prisma/client'
import { IsEnum, IsString } from 'class-validator'

export class CreateAssetDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  symbol: string

  @ApiProperty({ enum: AssetType })
  @IsEnum(AssetType)
  type: AssetType
}
