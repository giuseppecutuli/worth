import { ApiProperty } from '@nestjs/swagger'
import { AccountType } from '@prisma/client'
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'

import { ExistOnDb } from '@/prisma/decorators/exist-on-db.decorator'

export class UpdateAccountDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  iban?: string

  @ApiProperty({ enum: AccountType, required: false })
  @IsEnum(AccountType)
  @IsOptional()
  type?: AccountType

  @ApiProperty({ required: false })
  @IsUUID(undefined, { each: true })
  @IsOptional()
  @ExistOnDb({ entity: 'accountCategory', field: 'id' })
  categories?: string[]
}
