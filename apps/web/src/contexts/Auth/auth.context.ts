import { createContext } from 'react'

import type { Token, User } from '@/lib/api'

export type AuthContextType = {
  isAuthenticated: boolean
  login: (token: Token) => void
  logout: () => void
  user?: User
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => null,
  logout: () => null,
})
