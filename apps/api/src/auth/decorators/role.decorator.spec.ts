import { SetMetadata } from '@nestjs/common'
import { UseRoles, ROLES_KEY } from './role.decorator'
import { Role } from '@prisma/client'

jest.mock('@nestjs/common', () => ({
  SetMetadata: jest.fn(),
}))

describe('UseRoles Decorator', () => {
  it('should call SetMetadata with the correct key and roles', () => {
    const roles: Role[] = ['ADMIN', 'USER']

    UseRoles(...roles)

    expect(SetMetadata).toHaveBeenCalledWith(ROLES_KEY, roles)
  })

  it('should call SetMetadata with an empty array when no roles are provided', () => {
    UseRoles()

    expect(SetMetadata).toHaveBeenCalledWith(ROLES_KEY, [])
  })
})
