import { createContext } from 'react'

import type { User } from '@/lib/api'

export type AuthContextType = {
  isAuthenticated: boolean
  user?: User
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
})
