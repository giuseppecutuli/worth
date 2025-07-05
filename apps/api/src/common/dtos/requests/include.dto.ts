import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString } from 'class-validator'

export class IncludeDto {
  @ApiProperty({ required: false, description: 'Include related entities' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  include?: string[]
}
