import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { UseAuth, UseUser } from '@/auth/decorators'
import { ApiPaginatedResponse } from '@/common/utils/swagger'
import { User } from '@/users/entities'

import { AssetsService } from './assets.service'
import { AssetListDto, CreateAssetDto, UpdateAssetDto } from './dtos/requests'
import { Asset } from './entities'

@Controller('assets')
export class AssetsController {
  constructor(private readonly service: AssetsService) {}

  /**
   * List assets
   *
   * @param query - Query params
   * @param user - User
   * @returns Paginated assets
   */
  @Get()
  @UseAuth()
  @ApiPaginatedResponse(Asset)
  list(@Query() query: AssetListDto, @UseUser() user: User) {
    return this.service.list(query, user)
  }

  /**
   * Get asset by ID
   *
   * @param id - Asset ID
   * @param user - User
   * @returns Asset
   */
  @Get(':id')
  @UseAuth()
  @ApiOkResponse({ type: Asset })
  get(@Param('id') id: string, @UseUser() user: User) {
    return this.service.get(id, user)
  }

  /**
   * Create asset
   *
   * @param body - Asset data
   * @param user - User
   * @returns Created asset
   */
  @Post()
  @UseAuth()
  @ApiOkResponse({ type: Asset })
  create(@Body() body: CreateAssetDto, @UseUser() user: User) {
    return this.service.create(body, user)
  }

  /**
   * Update asset
   *
   * @param id - Asset ID
   * @param body - Asset data
   * @param user - User
   * @returns Updated asset
   */
  @Put(':id')
  @UseAuth()
  @ApiOkResponse({ type: Asset })
  update(@Param('id') id: string, @Body() body: UpdateAssetDto, @UseUser() user: User) {
    return this.service.update(id, body, user)
  }

  /**
   * Delete asset
   *
   * @param id - Asset ID
   * @param user - User
   * @returns Deleted asset
   */
  @Delete(':id')
  @UseAuth()
  @ApiOkResponse()
  delete(@Param('id') id: string, @UseUser() user: User) {
    return this.service.delete(id, user)
  }
}
