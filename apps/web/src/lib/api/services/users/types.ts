export interface UpdateUserDto {
  first_name?: string
  last_name?: string
  current_password?: string
  new_password?: string
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string
  created_at: Date
  updated_at: Date
  first_name: string
  last_name: string
  email: string
  role: Role
}
