import { ApiProperty } from '@nestjs/swagger'
import { AssetType, Asset as PrismaAsset } from '@prisma/client'
import { BaseEntityDto } from '@/common/dtos'

export class Asset extends BaseEntityDto implements PrismaAsset {
  @ApiProperty()
  name: string

  @ApiProperty()
  symbol: string

  @ApiProperty({ enum: AssetType })
  type: AssetType

  @ApiProperty()
  user_id: string
}
