import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UpdateTransactionCategoryDto {
  @ApiProperty()
  @IsString()
  name: string
}
