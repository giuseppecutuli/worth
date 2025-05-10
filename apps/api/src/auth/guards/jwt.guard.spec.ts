import { AuthGuard } from '@nestjs/passport'

import { JwtAuthGuard } from './jwt.guard'

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard

  beforeEach(() => {
    guard = new JwtAuthGuard()
  })

  it('Should be defined', () => {
    expect(guard).toBeDefined()
  })

  it('Should extend AuthGuard with "jwt" strategy', () => {
    const jwt = AuthGuard('jwt')
    expect(guard).toBeInstanceOf(jwt)
  })
})
