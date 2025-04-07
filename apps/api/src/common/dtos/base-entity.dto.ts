import { ApiProperty } from '@nestjs/swagger'

export class BaseEntityDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  created_at: Date

  @ApiProperty()
  updated_at: Date
}
