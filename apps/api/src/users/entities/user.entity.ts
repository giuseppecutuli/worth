import { BaseEntityDto } from '@common/dtos'
import { ApiProperty } from '@nestjs/swagger'
import { User as PrismaUser, Role } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class User extends BaseEntityDto implements PrismaUser {
  @ApiProperty()
  first_name: string

  @ApiProperty()
  last_name: string

  @ApiProperty()
  email: string

  @ApiProperty({ enum: Role })
  role: Role

  @Exclude()
  password: string

  @Exclude()
  reset_token: string | null

  @Exclude()
  reset_token_expiration: Date | null
}
