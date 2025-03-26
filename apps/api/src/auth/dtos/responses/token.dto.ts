import { ApiProperty } from '@nestjs/swagger'

export class Token {
  @ApiProperty()
  access_token: string

  @ApiProperty()
  refresh_token: string

  @ApiProperty({ type: Date, description: 'Date of expiration of refresh token' })
  expiration_date: Date
}
