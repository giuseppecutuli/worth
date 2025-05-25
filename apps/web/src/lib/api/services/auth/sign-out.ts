import { REFRESH_TOKEN_KEY } from '@/lib/constants'

import { client } from '../../client'
import type { SignOutDto } from './types'

export const SIGN_OUT_ENDPOINT = '/auth/sign-out'

export const signOut = async (): Promise<void> => {
  const data: SignOutDto = {
    refresh_token: localStorage.getItem(REFRESH_TOKEN_KEY)!,
  }

  await client.post(SIGN_OUT_ENDPOINT, data)
}
