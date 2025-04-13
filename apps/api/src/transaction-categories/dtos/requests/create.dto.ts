import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateTransactionCategoryDto {
  @ApiProperty()
  @IsString()
  name: string
}
