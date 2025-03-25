import { Test, TestingModule } from '@nestjs/testing'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { ConfigService } from '@nestjs/config'
import { PasswordService } from './password.service'
import { PrismaService } from './prisma.service'
import { RefreshTokenDto, SignInDto, SignUpDto } from '@auth/dtos/requests'
import { RefreshToken, User } from '@prisma/client'

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

      jest.spyOn(authService as any, 'createAccessToken').mockResolvedValue(accessToken)

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

      const user = { id: 'anotherUserId' }

      await expect(authService.signOut({ refresh_token: 'token' }, user as any)).rejects.toThrow(ConflictException)
    })

    it('should remove refresh token from user', async () => {
      jest.spyOn(jwtService, 'verify').mockReturnValue({ userId: 'userId' })

      const user = { id: 'userId' }

      jest.spyOn(prisma.user, 'update').mockResolvedValue({} as User)

      await authService.signOut({ refresh_token: 'token' }, user as any)

      expect(prisma.user.update).toHaveBeenCalledWith({ _id: 'userId' }, { $pull: { refresh_tokens: { token: 'token' } } })
    })
  })

  describe('forgotPassword', () => {
    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null)

      const forgotPasswordDto: ForgotPasswordDto = { email: 'email' }

      await expect(authService.forgotPassword(forgotPasswordDto)).rejects.toThrow(NotFoundException)
    })

    it('should return a new password reset token', async () => {
      const mockSave = jest.fn()
      jest.spyOn(userModel, 'findOne').mockResolvedValue({ _id: 'userId', save: mockSave } as any)

      const forgotPasswordDto: ForgotPasswordDto = { email: 'email' }

      const result = await authService.forgotPassword(forgotPasswordDto)

      expect(mockSave).toHaveBeenCalled()
      expect(result).toEqual(AuthMessages.RESET_TOKEN_SENT)
    })
  })

  describe('resetPassword', () => {
    it('should throw NotFoundException if token is invalid', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null)

      const resetPasswordDto: ResetPasswordDto = { token: 'token', password: 'password' }

      await expect(authService.resetPassword(resetPasswordDto)).rejects.toThrow(NotFoundException)
    })

    it('should reset password if token is valid', async () => {
      const mockSave = jest.fn()
      const user = { _id: 'userId', reset_token: 'token', reset_token_expiration: new Date(), password: 'password', save: mockSave }
      jest.spyOn(userModel, 'findOne').mockResolvedValue(user)
      jest.spyOn(PasswordService, 'hashPassword').mockResolvedValue('hashedPassword')

      const resetPasswordDto: ResetPasswordDto = { token: 'token', password: 'password' }

      await authService.resetPassword(resetPasswordDto)

      expect(user.reset_token).toBeNull()
      expect(user.reset_token_expiration).toBeNull()
      expect(user.password).toBe('hashedPassword')
      expect(mockSave).toHaveBeenCalled()
    })
  })

  describe('createTokens', () => {
    it('should return access and refresh tokens with expiration date', async () => {
      const userId = 'userId'
      const accessToken = 'accessToken'
      const refreshToken = 'refreshToken'

      jest.spyOn(jwtService, 'sign').mockImplementation((payload, options) => {
        if (options?.secret === 'refreshSecret') {
          return refreshToken
        }
        return accessToken
      })
      jest.spyOn(authService as any, 'calculateExpirationDate').mockReturnValue(new Date())

      const result = await (authService as any).createTokens(userId)

      expect(userModel.updateOne).toHaveBeenCalledWith(
        { _id: 'userId' },
        { $push: { refresh_tokens: { token: refreshToken, expiration_date: expect.any(Date) } } },
      )
      expect(result).toEqual({
        accessToken,
        refreshToken,
        expirationDate: expect.any(Date),
      })
    })
  })
})
