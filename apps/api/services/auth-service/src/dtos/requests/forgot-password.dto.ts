import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class ForgotPasswordDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string
}
