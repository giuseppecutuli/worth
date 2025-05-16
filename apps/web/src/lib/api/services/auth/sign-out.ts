import { client } from '../../client'
import type { SignOutDto } from './types'

export const SIGN_OUT_ENDPOINT = '/auth/sign-out'

export const signOut = async (data: SignOutDto): Promise<void> => {
  await client.post(SIGN_OUT_ENDPOINT, data)
}
