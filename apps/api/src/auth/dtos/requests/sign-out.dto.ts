import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class SignOutDto {
  @ApiProperty()
  @IsString()
  refresh_token: string
}
