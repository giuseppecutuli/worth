import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { CreateAssetDto, UpdateAssetDto, AssetListDto } from './dtos/requests'
import { User } from '@/users/entities'
import { PaginatedDto } from '@/common/dtos'
import { Asset } from './entities'

@Injectable()
export class AssetsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * List assets
   *
   * @param query - Query params
   * @param user - User
   * @returns Paginated assets
   */
  async list(query: AssetListDto, user: User): Promise<PaginatedDto<Asset>> {
    const where: Prisma.AssetWhereInput = {
      name: {
        contains: query.name,
      },
      symbol: {
        contains: query.symbol,
      },
      type: query.type,
      user_id: user.id,
    }

    const orderBy: Prisma.AssetOrderByWithRelationInput = {
      [query.order.field]: query.order.direction,
    }

    const [count, data] = await Promise.all([
      this.prisma.asset.count({ where }),
      this.prisma.asset.findMany({
        where,
        orderBy,
        take: query.limit,
        skip: query.page * query.limit,
      }),
    ])

    return {
      data,
      count,
      limit: query.limit,
      page: query.page,
      total_pages: Math.ceil(count / query.limit),
    }
  }

  /**
   * Get asset by ID
   *
   * @param id - Asset ID
   * @param user - User
   * @returns Asset
   * @throws NotFoundException
   */
  async get(id: string, user: User): Promise<Asset> {
    const asset = await this.prisma.asset.findUnique({ where: { id, user_id: user.id } })

    if (!asset) {
      throw new NotFoundException()
    }

    return asset
  }

  /**
   * Create a new asset
   *
   * @param data - Asset data
   * @param user - User
   * @returns Created asset
   */
  async create(data: CreateAssetDto, user: User): Promise<Asset> {
    const asset = await this.prisma.asset.create({
      data: {
        ...data,
        user_id: user.id,
      },
    })

    return asset
  }

  /**
   * Update an asset
   *
   * @param id - Asset ID
   * @param data - Asset data
   * @param user - User
   * @returns Updated asset
   * @throws NotFoundException
   */
  async update(id: string, data: UpdateAssetDto, user: User): Promise<Asset> {
    const asset = await this.prisma.asset.update({
      where: { id, user_id: user.id },
      data,
    })

    if (!asset) {
      throw new NotFoundException()
    }

    return asset
  }

  /**
   * Delete an asset
   *
   * @param id - Asset ID
   * @param user - User
   */
  async delete(id: string, user: User): Promise<void> {
    await this.prisma.asset.delete({ where: { id, user_id: user.id } })
  }
}
