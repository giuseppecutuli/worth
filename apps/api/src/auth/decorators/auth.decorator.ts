import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { Role } from '@prisma/client'

import { RolesGuard } from '@/auth/guards/roles.guard'

import { JwtAuthGuard } from '../guards/jwt.guard'
import { UseRoles } from './role.decorator'

export const UseAuth = (roles: Role[] = []) => {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    UseRoles(...roles),
    UseGuards(RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  )
}
