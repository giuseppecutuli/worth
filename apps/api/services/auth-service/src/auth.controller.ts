import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UseAuth } from './decorators/auth.decorator'
import { UseUser } from './decorators/user.decorator'
import { AuthService } from './services/auth.service'
import { Token, User } from './dtos/responses'
import { ForgotPasswordDto, RefreshTokenDto, ResetPasswordDto, SignInDto, SignOutDto, SignUpDto } from './dtos/requests'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiOkResponse({
    type: Token,
  })
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body)
  }

  @Post('sign-up')
  @ApiOkResponse({
    type: Token,
  })
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body)
  }

  @Get('me')
  @UseAuth()
  @ApiOkResponse({
    type: User,
  })
  me(@UseUser() user: User) {
    return user
  }

  @Post('refresh-token')
  @ApiOkResponse({
    type: Token,
  })
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body)
  }

  @Post('sign-out')
  @UseAuth()
  @ApiOkResponse()
  async signOut(@Body() body: SignOutDto, @UseUser() user: User) {
    return this.authService.signOut(body, user)
  }

  @Post('forgot-password')
  @ApiOkResponse()
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body)
  }

  @Post('reset-password')
  @ApiOkResponse()
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body)
  }
}
