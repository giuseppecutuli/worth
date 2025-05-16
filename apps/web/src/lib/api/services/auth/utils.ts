import { ACCESS_TOKEN_KEY, EXPIRATION_DATE_KEY, REFRESH_TOKEN_KEY } from '@/lib/constants'

import type { Token } from './types'

export const setTokens = (token: Token) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token)
  localStorage.setItem(REFRESH_TOKEN_KEY, token.refresh_token)
  localStorage.setItem(EXPIRATION_DATE_KEY, token.expiration_date)
}

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(EXPIRATION_DATE_KEY)
}
