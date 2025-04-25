import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'
import { PASSWORD_MIN_LENGTH } from '@/auth/auth.constants'

export class SignUpDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ minimum: PASSWORD_MIN_LENGTH })
  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string

  @ApiProperty()
  @IsString()
  first_name: string

  @ApiProperty()
  @IsString()
  last_name: string
}
