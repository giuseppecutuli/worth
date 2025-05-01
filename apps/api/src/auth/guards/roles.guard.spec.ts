import { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RolesGuard } from './roles.guard'
import { Role, User } from '@prisma/client'

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard
  let reflector: Reflector
  let getAllAndOverride: jest.Mock

  beforeEach(() => {
    getAllAndOverride = jest.fn()

    reflector = {
      getAllAndOverride,
    } as unknown as Reflector

    rolesGuard = new RolesGuard(reflector)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should be defined', () => {
    expect(rolesGuard).toBeDefined()
  })

  describe('canActivate', () => {
    let user: User

    const getRequest = jest.fn()
    const switchToHttp = jest.fn()

    const context = {
      switchToHttp,
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext

    beforeEach(() => {
      user = {
        id: '1',
        role: Role.USER,
      } as User

      getRequest.mockReturnValue({
        user,
      })

      switchToHttp.mockReturnValue({
        getRequest,
      })
    })

    it('Should return true if no roles are required', () => {
      getAllAndOverride.mockReturnValue(undefined)

      const result = rolesGuard.canActivate(context)

      expect(result).toBe(true)
      expect(getAllAndOverride).toHaveBeenCalled()
    })

    it('Should return true if user has a required role', () => {
      user.role = Role.ADMIN
      getAllAndOverride.mockReturnValue([Role.ADMIN])

      const result = rolesGuard.canActivate(context)

      expect(result).toBe(true)
      expect(getAllAndOverride).toHaveBeenCalled()
    })

    it('Should return false if user does not have a required role', () => {
      getAllAndOverride.mockReturnValue([Role.ADMIN])

      const result = rolesGuard.canActivate(context)

      expect(result).toBe(false)
      expect(getAllAndOverride).toHaveBeenCalled()
    })
  })
})
