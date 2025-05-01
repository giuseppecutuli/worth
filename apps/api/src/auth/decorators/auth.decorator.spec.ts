import { UseAuth } from './auth.decorator'
import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { UseRoles } from './role.decorator'
import { Role } from '@prisma/client'

jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
  applyDecorators: jest.fn(),
  UseGuards: jest.fn(),
}))
jest.mock('@nestjs/swagger', () => ({
  ApiBearerAuth: jest.fn(),
  ApiUnauthorizedResponse: jest.fn(),
}))
jest.mock('./role.decorator', () => ({
  UseRoles: jest.fn(),
}))

describe('UseAuth Decorator', () => {
  it('should apply the correct decorators and guards', () => {
    const roles: Role[] = ['ADMIN', 'USER']

    UseAuth(roles)

    expect(applyDecorators).toHaveBeenCalledWith(
      UseGuards(JwtAuthGuard),
      UseRoles(...roles),
      UseGuards(RolesGuard),
      ApiBearerAuth(),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    )
  })

  it('should apply default decorators when no roles are provided', () => {
    UseAuth()

    expect(applyDecorators).toHaveBeenCalledWith(
      UseGuards(JwtAuthGuard),
      UseRoles(),
      UseGuards(RolesGuard),
      ApiBearerAuth(),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    )
  })
})
