import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { Role } from '@prisma/client'
import { UseRoles } from './role.decorator'
import { RolesGuard } from '@/auth/guards/roles.guard'

export const UseAuth = (roles: Role[] = []) => {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    UseRoles(...roles),
    UseGuards(RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  )
}
