import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UpdateAccountCategoryDto {
  @ApiProperty()
  @IsString()
  name: string
}
