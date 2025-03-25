import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

import { PASSWORD_MIN_LENGTH } from '@auth/auth.constants'

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  token: string

  @ApiProperty({ minimum: PASSWORD_MIN_LENGTH })
  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string
}
