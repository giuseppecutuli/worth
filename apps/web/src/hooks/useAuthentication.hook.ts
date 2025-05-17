import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useAuth } from '@/contexts/Auth'
import { type ApiError, signIn, type SignInDto, signUp, type SignUpDto, type Token } from '@/lib/api'

export const useAuthentication = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const signInMutation = useMutation<Token, ApiError, SignInDto>({
    mutationFn: signIn,
  })

  const signUpMutation = useMutation<Token, ApiError, SignUpDto>({
    mutationFn: signUp,
  })

  useEffect(() => {
    if (!signInMutation.isSuccess && !signUpMutation.isSuccess) {
      return
    }

    login(signInMutation.data! || signUpMutation.data!)
    navigate({ to: '/' })
  }, [signInMutation.isSuccess, signUpMutation.isSuccess])

  return {
    signIn: signInMutation,
    signUp: signUpMutation,
  }
}
