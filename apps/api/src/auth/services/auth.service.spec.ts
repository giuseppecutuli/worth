import { ConflictException, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { RefreshToken, User } from '@prisma/client'

import { AuthMessages } from '@/auth/auth.constants'
import { ForgotPasswordDto, RefreshTokenDto, ResetPasswordDto, SignInDto, SignOutDto, SignUpDto } from '@/auth/dtos/requests'
import { PrismaService } from '@/prisma/prisma.service'

import { AuthService } from './auth.service'
import { PasswordService } from './password.service'

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn().mockReturnValue({
    exp: 1,
  }),
  JwtPayload: class JwtPayload {},
}))

describe('AuthService', () => {
  let authService: AuthService
  let prisma: PrismaService
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue({
              jwtRefreshSecret: 'refreshSecret',
              jwtRefreshExpiresIn: '1d',
            }),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              findFirst: jest.fn(),
            },
            refreshToken: {
              findFirst: jest.fn(),
              delete: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    prisma = module.get<PrismaService>(PrismaService)
    jwtService = module.get<JwtService>(JwtService)
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('signIn', () => {
    it('should throw ConflictException if user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)

      const signInDto: SignInDto = { email: 'test@example.com', password: 'password' }

      await expect(authService.signIn(signInDto)).rejects.toThrow(ConflictException)
    })

    it('should throw ConflictException if password is invalid', async () => {
      const user = { password: 'hashedPassword' } as User
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user)
      jest.spyOn(PasswordService, 'validatePassword').mockResolvedValue(false)

      const signInDto: SignInDto = { email: 'test@example.com', password: 'password' }

      await expect(authService.signIn(signInDto)).rejects.toThrow(ConflictException)
    })

    it('should return tokens if credentials are valid', async () => {
      const user = { id: 'userId', password: 'hashedPassword' } as User
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user)
      jest.spyOn(PasswordService, 'validatePassword').mockResolvedValue(true)
      jest.spyOn(authService as any, 'createTokens').mockResolvedValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        expirationDate: new Date(),
      })

      const signInDto: SignInDto = { email: 'test@example.com', password: 'password' }

      const result = await authService.signIn(signInDto)

      expect(result).toEqual({
        access_token: 'accessToken',
        refresh_token: 'refreshToken',
        expiration_date: expect.any(Date),
      })
    })
  })

  describe('signUp', () => {
    it('should throw ConflictException if email already exists', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({} as User)

      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'password',
        first_name: 'first_name',
        last_name: 'last_name',
      }

      await expect(authService.signUp(signUpDto)).rejects.toThrow(ConflictException)
    })

    it('should create a new user and return tokens if email does not exist', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)
      jest.spyOn(prisma.user, 'create').mockResolvedValue({ id: 'userId' } as User)
      jest.spyOn(authService as any, 'createTokens').mockResolvedValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        expirationDate: new Date(),
      })

      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'password',
        first_name: 'first_name',
        last_name: 'last_name',
      }

      const result = await authService.signUp(signUpDto)

      expect(result).toEqual({
        access_token: 'accessToken',
        refresh_token: 'refreshToken',
        expiration_date: expect.any(Date),
      })
    })
  })

  describe('refreshToken', () => {
    it('should throw ConflictException if token is invalid', async () => {
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error()
      })

      const refreshTokenDto: RefreshTokenDto = { token: 'token' }

      await expect(authService.refreshToken(refreshTokenDto)).rejects.toThrow(ConflictException)
    })

    it('should throw ConflictException if user is not found', async () => {
      jest.spyOn(jwtService, 'verify').mockReturnValue({ userId: 'userId' })
      jest.spyOn(prisma.refreshToken, 'findFirst').mockResolvedValue(null)
      const refreshTokenDto: RefreshTokenDto = { token: 'token' }

      await expect(authService.refreshToken(refreshTokenDto)).rejects.toThrow(ConflictException)
    })

    it('should return tokens if token is valid', async () => {
      jest.spyOn(jwtService, 'verify').mockReturnValue({ userId: 'userId' })
      const accessToken = 'accessToken'
      const refreshToken = 'refreshToken'
      const refreshTokenDto: RefreshTokenDto = { token: refreshToken }

      jest.spyOn(prisma.refreshToken, 'findFirst').mockResolvedValue({} as RefreshToken)

      jest.spyOn(authService as any, 'calculateExpirationDate').mockReturnValue(new Date())

      jest.spyOn(authService as any, 'createAccessToken').mockReturnValue(accessToken)

      const result = await authService.refreshToken(refreshTokenDto)

      expect(result).toEqual({
        access_token: accessToken,
        refresh_token: refreshToken,
        expiration_date: expect.any(Date),
      })
    })
  })

  describe('signOut', () => {
    it('should throw ConflictException if userId is invalid', async () => {
      jest.spyOn(jwtService, 'verify').mockReturnValue({ userId: 'userId' })

      const user = { id: 'anotherUserId' } as User

      await expect(authService.signOut({ refresh_token: 'token' }, user)).rejects.toThrow(ConflictException)
    })

    it('should remove refresh token from user', async () => {
      jest.spyOn(jwtService, 'verify').mockReturnValue({ userId: 'userId' })

      const user: User = { id: 'userId' } as User
      const data: SignOutDto = { refresh_token: 'token_id' }

      await authService.signOut(data, user)

      expect(prisma.refreshToken.delete).toHaveBeenCalledWith({
        where: {
          token: data.refresh_token,
        },
      })
    })
  })

  describe('forgotPassword', () => {
    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)

      const forgotPasswordDto: ForgotPasswordDto = { email: 'email' }

      await expect(authService.forgotPassword(forgotPasswordDto)).rejects.toThrow(NotFoundException)
    })

    it('should return a new password reset token', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({ id: 'userId' } as User)

      const forgotPasswordDto: ForgotPasswordDto = { email: 'email' }

      const result = await authService.forgotPassword(forgotPasswordDto)

      expect(prisma.user.update).toHaveBeenCalled()
      expect(result).toEqual(AuthMessages.RESET_TOKEN_SENT)
    })
  })

  describe('resetPassword', () => {
    it('should throw NotFoundException if token is invalid', async () => {
      jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null)

      const resetPasswordDto: ResetPasswordDto = { token: 'token', password: 'password' }

      await expect(authService.resetPassword(resetPasswordDto)).rejects.toThrow(NotFoundException)
    })

    it('should reset password if token is valid', async () => {
      const user = { id: 'userId', reset_token: 'token', reset_token_expiration: new Date(), password: 'password' } as User
      jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(user)
      jest.spyOn(PasswordService, 'hashPassword').mockResolvedValue('hashedPassword')

      const resetPasswordDto: ResetPasswordDto = { token: 'token', password: 'password' }

      await authService.resetPassword(resetPasswordDto)

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: {
          id: 'userId',
        },
        data: {
          password: 'hashedPassword',
          reset_token: null,
          reset_token_expiration: null,
        },
      })
    })
  })

  describe('createTokens', () => {
    it('should return access and refresh tokens with expiration date', async () => {
      const userId = 'userId'
      const accessToken = 'accessToken'
      const refreshToken = 'refreshToken'

      jest.spyOn(authService as any, 'createAccessToken').mockReturnValue(accessToken)
      jest.spyOn(authService as any, 'createRefreshToken').mockReturnValue({
        token: refreshToken,
        expirationDate: new Date(),
      })

      const result = await authService['createTokens'](userId)

      expect(result).toEqual({
        accessToken,
        refreshToken,
        expirationDate: expect.any(Date),
      })
    })
  })

  describe('createAccessToken', () => {
    it('should return access token', () => {
      const payload = { userId: 'userId' }

      jest.spyOn(jwtService, 'sign').mockReturnValue('accessToken')

      const result = authService['createAccessToken'](payload)

      expect(result).toEqual('accessToken')
    })
  })

  describe('createRefreshToken', () => {
    it('should return refresh token with expiration date', async () => {
      const payload = { userId: 'userId' }

      jest.spyOn(jwtService, 'sign').mockReturnValue('refreshToken')
      jest.spyOn(authService as any, 'calculateExpirationDate').mockReturnValue(new Date())

      const result = await authService['createRefreshToken'](payload)

      expect(result).toEqual({
        token: 'refreshToken',
        expirationDate: expect.any(Date),
      })
      expect(prisma.refreshToken.create).toHaveBeenCalledWith({
        data: {
          token: 'refreshToken',
          user_id: 'userId',
          expiration_date: expect.any(Date),
        },
      })
    })
  })

  describe('calculateExpirationDate', () => {
    it('should return expiration date', () => {
      const token = 'token'

      const result = authService['calculateExpirationDate'](token)

      expect(result).toBeInstanceOf(Date)
    })
  })
})
