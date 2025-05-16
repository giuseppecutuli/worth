import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { type ApiError, setTokens, signIn, type SignInDto, type Token } from '@/lib/api'
import { LOGIN_EVENT } from '@/lib/constants'

export const useSignIn = () => {
  const mutation = useMutation<Token, ApiError, SignInDto>({
    mutationFn: signIn,
  })

  useEffect(() => {
    if (!mutation.isSuccess) {
      return
    }

    setTokens(mutation.data)

    window.dispatchEvent(new Event(LOGIN_EVENT))
  }, [mutation.isSuccess])

  return mutation
}
