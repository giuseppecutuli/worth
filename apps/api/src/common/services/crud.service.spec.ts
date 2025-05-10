import { Injectable, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/prisma/prisma.service'
import { User } from '@/users/entities'

import { BaseEntityDto, PaginateDto } from '../dtos'
import { CrudService } from './crud.service'

// Mock DTOs
class TestListDto extends PaginateDto {}
class TestCreateDto {}
class TestUpdateDto {}
class TestEntity extends BaseEntityDto {
  user_id: string
}

@Injectable()
class TestCrudService extends CrudService<TestEntity, TestCreateDto, TestUpdateDto, TestListDto> {
  constructor(prisma: PrismaService) {
    // @ts-expect-error Only for testing
    super(prisma, 'Test')
  }

  protected buildWhere(query: TestListDto): Prisma.Args<any, 'findMany'>['where'] {
    return {}
  }
}

describe('CrudService', () => {
  let service: TestCrudService
  let model: {
    findMany: jest.Mock
    count: jest.Mock
    findUnique: jest.Mock
    create: jest.Mock
    update: jest.Mock
    delete: jest.Mock
  }

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    password: 'password',
    first_name: 'Test',
    last_name: 'User',
    role: 'USER',
    created_at: new Date(),
    updated_at: new Date(),
    reset_token: null,
    reset_token_expiration: null,
  }

  const mockEntity: TestEntity = {
    id: '1',
    user_id: mockUser.id,
    created_at: new Date(),
    updated_at: new Date(),
  }

  beforeEach(async () => {
    model = {
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            test: model,
          },
        },
        TestCrudService,
      ],
    }).compile()

    service = module.get<TestCrudService>(TestCrudService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('list', () => {
    it('should return paginated entities', async () => {
      const query = new TestListDto()
      const mockEntities = [mockEntity]
      const mockCount = 1

      model.findMany.mockResolvedValue(mockEntities)
      model.count.mockResolvedValue(mockCount)

      const spy = jest.spyOn(service, 'buildWhere')

      const result = await service.list(query, mockUser)

      expect(result).toEqual({
        data: mockEntities,
        count: mockCount,
        limit: query.limit,
        page: query.page,
        total_pages: Math.ceil(mockCount / query.limit),
      })
      expect(spy).toHaveBeenCalledWith(query, mockUser)
    })
  })

  describe('get', () => {
    it('should return an entity', async () => {
      model.findUnique.mockResolvedValue(mockEntity)

      const result = await service.get('1', mockUser)

      expect(result).toEqual(mockEntity)
    })

    it('should throw NotFoundException if entity not found', async () => {
      model.findUnique.mockResolvedValue(null)

      await expect(service.get('1', mockUser)).rejects.toThrow(NotFoundException)
    })
  })

  describe('create', () => {
    it('should create and return an entity', async () => {
      const createDto = new TestCreateDto()
      model.create.mockResolvedValue(mockEntity)

      const spy = jest.spyOn(service, 'buildCreateData')

      const result = await service.create(createDto, mockUser)

      expect(result).toEqual(mockEntity)
      expect(model.create).toHaveBeenCalledWith({
        data: {
          ...createDto,
          user_id: mockUser.id,
        },
      })
      expect(spy).toHaveBeenCalledWith(createDto, mockUser)
    })
  })

  describe('update', () => {
    it('should update and return an entity', async () => {
      const updateDto = new TestUpdateDto()
      model.update.mockResolvedValue(mockEntity)

      const spy = jest.spyOn(service, 'buildUpdateData')

      const result = await service.update('1', updateDto, mockUser)

      expect(result).toEqual(mockEntity)
      expect(model.update).toHaveBeenCalledWith({
        where: { id: '1', user_id: mockUser.id },
        data: updateDto,
      })
      expect(spy).toHaveBeenCalledWith(updateDto, mockUser)
    })
  })

  describe('delete', () => {
    it('should delete an entity', async () => {
      model.delete.mockResolvedValue(mockEntity)

      await service.delete('1', mockUser)

      expect(model.delete).toHaveBeenCalledWith({
        where: { id: '1', user_id: mockUser.id },
      })
    })
  })
})
