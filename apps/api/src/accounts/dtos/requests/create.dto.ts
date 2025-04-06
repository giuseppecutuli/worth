import { ApiProperty } from '@nestjs/swagger'
import { AccountType } from '@prisma/client'
import { ExistOnDb } from '@prisma/decorators/exist-on-db.decorator'
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateAccountDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  iban?: string

  @ApiProperty({ enum: AccountType })
  @IsEnum(AccountType)
  type: AccountType

  @ApiProperty()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  @ExistOnDb({ entity: 'accountCategory', field: 'id' })
  categories: string[]
}
