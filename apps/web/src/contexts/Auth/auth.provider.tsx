import { useQuery } from '@tanstack/react-query'
import { type PropsWithChildren, useEffect, useState } from 'react'

import { me, ME_ENDPOINT, removeTokens, setTokens, type Token } from '@/lib/api'
import { ACCESS_TOKEN_KEY, LOGOUT_EVENT } from '@/lib/constants'

import { AuthContext, type AuthContextType } from './auth.context'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY)
  })
  const { data: user } = useQuery({
    queryKey: [ME_ENDPOINT],
    queryFn: me,
    enabled: isAuthenticated,
  })

  const login = (token: Token) => {
    setTokens(token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    removeTokens()
    setIsAuthenticated(false)
  }

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    user,
  }

  useEffect(() => {
    document.addEventListener(LOGOUT_EVENT, logout)

    return () => {
      document.removeEventListener(LOGOUT_EVENT, logout)
    }
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
