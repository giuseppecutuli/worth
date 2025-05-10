import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/prisma/prisma.service'
import { User } from '@/users/entities'

import { PaginatedDto, PaginateDto } from '../dtos'
import { lcFirst } from '../utils'

/**
 * Base service for CRUD operations
 * @template Entity - Entity type
 * @template CreateDto - Create DTO type
 * @template UpdateDto - Update DTO type
 * @template ListDto - List DTO type
 */
@Injectable()
export abstract class CrudService<Entity, CreateDto, UpdateDto, ListDto extends PaginateDto> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly modelName: Prisma.ModelName,
  ) {}

  /**
   * Return the instance of the model
   * @returns {object} - The instance of the model
   */
  get model() {
    const model = lcFirst(this.modelName)

    return this.prisma[model]
  }

  /**
   * Build the where clause for the list query
   * @param query - Query params
   * @param user - User
   * @returns {object} - The where clause
   */
  protected abstract buildWhere(query: ListDto, user: User): Prisma.Args<any, 'findMany'>['where']

  /**
   * Build the create data for the create query
   * @param data - Create data
   * @param user - User
   * @returns {object} - The create data
   */
  protected buildCreateData(data: CreateDto, user: User): Prisma.Args<any, 'create'>['data'] {
    return {
      ...data,
      user_id: user.id,
    }
  }

  /**
   * Build the update data for the update query
   * @param data - Update data
   * @param user - User
   * @returns {object} - The update data
   */
  protected buildUpdateData(data: UpdateDto, user: User): Prisma.Args<any, 'create'>['data'] {
    return data
  }

  /**
   * List entities
   * @param query - Query params
   * @param user - User
   * @returns {object} - Paginated entities
   */
  async list(query: ListDto, user: User): Promise<PaginatedDto<Entity>> {
    const where = this.buildWhere(query, user)
    where.user_id = user.id

    const orderBy: Prisma.Args<any, 'findMany'>['orderBy'] = {
      [query.order.field]: query.order.direction,
    }

    const [count, data] = await Promise.all([
      this.model.count({ where }),
      this.model.findMany({
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
   * Get an entity by ID
   * @param id - Entity ID
   * @param user - User
   * @returns {object} - The entity
   * @throws NotFoundException
   */
  async get(id: string, user: User): Promise<Entity> {
    const item = await this.model.findUnique({
      where: { id, user_id: user.id },
    })

    if (!item) {
      throw new NotFoundException()
    }

    return item
  }

  /**
   * Create an entity
   * @param data - Entity data
   * @param user - User
   * @returns {object} - The created entity
   */
  async create(_data: CreateDto, user: User): Promise<Entity> {
    const data = this.buildCreateData(_data, user)
    data.user_id = user.id

    return await this.model.create({
      data,
    })
  }

  /**
   * Update an entity
   * @param id - Entity ID
   * @param data - Entity data
   * @param user - User
   * @returns {object} - The updated entity
   * @throws NotFoundException
   */
  async update(id: string, data: UpdateDto, user: User): Promise<Entity> {
    const item = await this.model.update({
      where: { id, user_id: user.id },
      data: this.buildUpdateData(data, user),
    })

    if (!item) {
      throw new NotFoundException()
    }

    return item
  }

  /**
   * Delete an entity
   * @param id - Entity ID
   * @param user - User
   * @throws NotFoundException
   */
  async delete(id: string, user: User): Promise<void> {
    await this.model.delete({
      where: { id, user_id: user.id },
    })
  }
}
