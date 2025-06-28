import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Role } from '@prisma/client'
import { jwtDecode, JwtPayload as JwtDecodePayload } from 'jwt-decode'

import { AuthErrors, AuthMessages, RESET_TOKEN_DURATION } from '@/auth/auth.constants'
import {
  ForgotPasswordDto,
  RefreshTokenDto,
  ResetPasswordDto,
  SignInDto,
  SignOutDto,
  SignUpDto,
} from '@/auth/dtos/requests'
import { Token } from '@/auth/dtos/responses'
import { JwtPayload } from '@/auth/interfaces'
import { randomString } from '@/common/utils'
import { Config } from '@/config/config.interface'
import { PrismaService } from '@/prisma/prisma.service'
import { User } from '@/users/entities'

import { PasswordService } from './password.service'

@Injectable()
export class AuthService {
  private readonly refreshTokenSecret: string
  private readonly refreshTokenExpireIn: string

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const jwtConfig = this.configService.get<Config['jwt']>('jwt', { infer: true })
    this.refreshTokenSecret = jwtConfig.refreshSecret
    this.refreshTokenExpireIn = jwtConfig.refreshExpiresIn
  }

  async signIn(data: SignInDto): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } })

    if (!user) {
      throw new ConflictException(AuthErrors.SIGN_IN_INVALID_CREDENTIALS)
    }

    const isPasswordValid = await PasswordService.validatePassword(data.password, user.password)
    if (!isPasswordValid) {
      throw new ConflictException(AuthErrors.SIGN_IN_INVALID_CREDENTIALS)
    }

    const { accessToken, refreshToken, expirationDate } = await this.createTokens(user.id)

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expiration_date: expirationDate,
    }
  }

  async signUp(data: SignUpDto): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } })
    if (user) {
      throw new ConflictException(AuthErrors.SIGN_UP_EMAIL_ALREADY_EXISTS)
    }

    const hashedPassword = await PasswordService.hashPassword(data.password)

    const createdUser = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        first_name: data.first_name,
        last_name: data.last_name,
        role: Role.USER,
      },
    })

    const { accessToken, refreshToken, expirationDate } = await this.createTokens(createdUser.id)

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expiration_date: expirationDate,
    }
  }

  async refreshToken(data: RefreshTokenDto): Promise<Token> {
    let jwtPayload: JwtPayload
    try {
      jwtPayload = this.jwtService.verify<JwtPayload>(data.token, {
        secret: this.refreshTokenSecret,
      })
    } catch (e) {
      throw new ConflictException(AuthErrors.REFRESH_TOKEN_INVALID)
    }
    const { userId } = jwtPayload

    const token = await this.prisma.refreshToken.findFirst({
      where: {
        token: data.token,
        user_id: userId,
      },
    })

    if (!token) {
      throw new ConflictException(AuthErrors.REFRESH_TOKEN_NOT_FOUND)
    }

    const accessToken = this.createAccessToken({ userId })
    const expirationDate = this.calculateExpirationDate(data.token)

    return {
      access_token: accessToken,
      refresh_token: data.token,
      expiration_date: expirationDate,
    }
  }

  async signOut(data: SignOutDto, user: User) {
    const { userId } = this.jwtService.verify<JwtPayload>(data.refresh_token, {
      secret: this.refreshTokenSecret,
    })

    if (userId !== user.id) {
      throw new ConflictException(AuthErrors.REFRESH_TOKEN_INVALID)
    }

    await this.prisma.refreshToken.delete({
      where: {
        token: data.refresh_token,
      },
    })
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } })
    if (!user) {
      throw new NotFoundException(AuthErrors.FORGOT_PASSWORD_USER_NOT_FOUND)
    }

    const expireAt = new Date()
    expireAt.setHours(expireAt.getHours() + RESET_TOKEN_DURATION)

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        reset_token: randomString(12),
        reset_token_expiration: expireAt,
      },
    })

    return AuthMessages.RESET_TOKEN_SENT
  }

  async resetPassword(data: ResetPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        refresh_tokens: {
          some: {
            token: data.token,
            expiration_date: { gt: new Date() },
          },
        },
      },
    })

    if (!user) {
      throw new NotFoundException(AuthErrors.RESET_PASSWORD_TOKEN_NOT_VALID)
    }

    const hashedPassword = await PasswordService.hashPassword(data.password)

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        reset_token: null,
        reset_token_expiration: null,
      },
    })
  }

  private async createTokens(userId: string) {
    const accessToken = this.createAccessToken({ userId })
    const { token: refreshToken, expirationDate } = await this.createRefreshToken({ userId })
    return { accessToken, refreshToken, expirationDate }
  }

  private createAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }

  private async createRefreshToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload, {
      secret: this.refreshTokenSecret,
      expiresIn: this.refreshTokenExpireIn,
    })
    const expirationDate = this.calculateExpirationDate(token)
    await this.prisma.refreshToken.create({
      data: {
        token,
        expiration_date: expirationDate,
        user_id: payload.userId,
      },
    })

    return { token, expirationDate }
  }

  private calculateExpirationDate(token: string) {
    const { exp } = jwtDecode<JwtDecodePayload>(token)
    const expirationDate = new Date(0)
    expirationDate.setUTCSeconds(exp || 0)
    return expirationDate
  }
}
