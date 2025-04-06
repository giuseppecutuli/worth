import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@users/entities'

export const UseUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()

  return request.user as User
})
