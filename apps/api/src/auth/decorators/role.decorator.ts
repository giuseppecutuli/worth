import { SetMetadata } from '@nestjs/common'
import { Role } from '@prisma/client'

export const ROLES_KEY = 'roles'
export const UseRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
