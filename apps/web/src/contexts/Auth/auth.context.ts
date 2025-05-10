import { createContext } from 'react'

export type AuthContextType = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  user?: {
    name: string
    email: string
  }
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})
