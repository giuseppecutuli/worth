import { client } from '../../client'
import type { SignInDto, Token } from './types'

export const SIGN_IN_ENDPOINT = '/auth/sign-in'

export const signIn = async (data: SignInDto): Promise<Token> => {
  const response = await client.post<Token>(SIGN_IN_ENDPOINT, data)

  return response.data
}
