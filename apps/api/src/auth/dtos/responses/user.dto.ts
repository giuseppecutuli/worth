import { BaseEntityDto } from '@common/dtos'
import { ApiProperty } from '@nestjs/swagger'

export class User extends BaseEntityDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string

  @ApiProperty()
  first_name: string

  @ApiProperty()
  last_name: string
}
