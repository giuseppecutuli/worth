import { ApiProperty } from '@nestjs/swagger'
import { Asset as PrismaAsset, AssetType } from '@prisma/client'

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
