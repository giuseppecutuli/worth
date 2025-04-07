import { ApiProperty } from '@nestjs/swagger'
import { AccountCategory as PrismaAccountCategory } from '@prisma/client'
import { BaseEntityDto } from '@common/dtos'

export class AccountCategory extends BaseEntityDto implements PrismaAccountCategory {
  @ApiProperty()
  name: string

  @ApiProperty()
  user_id: string
}
