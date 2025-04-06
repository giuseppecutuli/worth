import { $Enums, User as PrismaUser } from '@prisma/client'

export class User implements PrismaUser {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  role: $Enums.Role
  reset_token: string | null
  reset_token_expiration: Date | null
  created_at: Date
  updated_at: Date
}
