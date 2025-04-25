import { ROLES_KEY } from '@/auth/decorators'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role, User } from '@prisma/client'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

    if (!requiredRoles?.length) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user: User = request.user

    return requiredRoles.includes(user.role)
  }
}
