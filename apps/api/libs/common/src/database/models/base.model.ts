import { ApiProperty } from '@nestjs/swagger'

export class BaseModel {
  @ApiProperty()
  id: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
