import { BaseModel } from '@microservices/common'
import { ApiProperty } from '@nestjs/swagger'

export class User extends BaseModel {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string

  @ApiProperty()
  first_name: string

  @ApiProperty()
  last_name: string
}
