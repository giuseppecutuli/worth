import { type PropsWithChildren } from 'react'

import { AuthContext } from './auth.context'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const login = () => {}
  const logout = () => {}
  const isAuthenticated = false

  const value = {
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
