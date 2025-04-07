import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, Max, Min } from 'class-validator'

export class PaginateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Min(0)
  page?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @Max(100)
  limit?: number
}
