import { ApiProperty } from '@nestjs/swagger'

export class BaseEntityDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
