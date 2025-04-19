import { PaginateDto } from '@common/dtos'
import { ApiProperty } from '@nestjs/swagger'
import { AccountType } from '@prisma/client'
import { ExistOnDb } from '@prisma/decorators/exist-on-db.decorator'
import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'

export class AccountListDto extends PaginateDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ enum: AccountType, required: false })
  @IsEnum(AccountType)
  @IsOptional()
  type?: AccountType

  @ApiProperty({ required: false })
  @IsUUID(undefined, { each: true })
  @IsArray()
  @IsOptional()
  @ExistOnDb({ entity: 'accountCategory', field: 'id' })
  categories?: string[]
}
