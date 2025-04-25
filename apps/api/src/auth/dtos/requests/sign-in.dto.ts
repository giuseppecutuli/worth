import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'
import { PASSWORD_MIN_LENGTH } from '@/auth/auth.constants'

export class SignInDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ minimum: PASSWORD_MIN_LENGTH })
  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string
}
