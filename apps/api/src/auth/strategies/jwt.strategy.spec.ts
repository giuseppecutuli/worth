import { UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'

import { PrismaService } from '@/prisma/prisma.service'

import { JwtStrategy } from './jwt.strategy'

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue({ secret: 'test-secret' }),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile()

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should be defined', () => {
    expect(jwtStrategy).toBeDefined()
  })

  describe('validate', () => {
    it('Should return the user if found', async () => {
      const mockUser = { id: '123', email: 'test@example.com' } as User
      const spy = jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser)

      const result = await jwtStrategy.validate({ userId: '123' })
      expect(result).toEqual(mockUser)
      expect(spy).toHaveBeenCalledWith({ where: { id: '123' } })
    })

    it('Should throw UnauthorizedException if user is not found', async () => {
      const spy = jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null)

      await expect(jwtStrategy.validate({ userId: '123' })).rejects.toThrow(UnauthorizedException)
      expect(spy).toHaveBeenCalledWith({ where: { id: '123' } })
    })
  })
})
