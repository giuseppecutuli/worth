import { useQuery } from '@tanstack/react-query'
import { type PropsWithChildren, useEffect, useState } from 'react'

import { me, ME_ENDPOINT, removeTokens } from '@/lib/api'
import { ACCESS_TOKEN_KEY, LOGIN_EVENT, LOGOUT_EVENT } from '@/lib/constants'

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

  const value: AuthContextType = {
    isAuthenticated,
    user,
  }

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    removeTokens()
    setIsAuthenticated(false)
  }

  useEffect(() => {
    window.addEventListener(LOGIN_EVENT, login)

    return () => {
      window.removeEventListener(LOGIN_EVENT, login)
    }
  }, [])

  useEffect(() => {
    window.addEventListener(LOGOUT_EVENT, logout)

    return () => {
      window.removeEventListener(LOGOUT_EVENT, logout)
    }
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
