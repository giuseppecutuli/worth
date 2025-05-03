import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { CreateAssetDto, UpdateAssetDto, AssetListDto } from './dtos/requests'
import { Asset } from './entities'
import { CrudService } from '@/common/services/crud.service'

@Injectable()
export class AssetsService extends CrudService<Asset, CreateAssetDto, UpdateAssetDto, AssetListDto> {
  constructor(prisma: PrismaService) {
    super(prisma, 'Asset')
  }

  /**
   * Build the where clause for the list query
   *
   * @param query - Query params
   * @returns {object} - The where clause
   */
  protected buildWhere(query: AssetListDto): Prisma.AssetWhereInput {
    return {
      name: {
        contains: query.name,
      },
      symbol: {
        contains: query.symbol,
      },
      type: query.type,
    }
  }
}
