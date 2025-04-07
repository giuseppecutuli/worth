import { ApiProperty } from '@nestjs/swagger'

export abstract class PaginatedDto<T> {
  data: T[]

  @ApiProperty()
  count: number

  @ApiProperty()
  limit: number

  @ApiProperty()
  page: number

  @ApiProperty()
  total_pages: number
}
