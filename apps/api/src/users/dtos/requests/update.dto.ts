import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, MinLength, ValidateIf } from 'class-validator'

import { PASSWORD_MIN_LENGTH } from '@/auth/auth.constants'

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  first_name?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  last_name?: string

  @ApiProperty({ required: false, minimum: PASSWORD_MIN_LENGTH })
  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  @IsOptional()
  current_password?: string

  @ApiProperty({ required: false })
  @ValidateIf((o) => !!o.current_password)
  @IsNotEmpty()
  new_password?: string
}
