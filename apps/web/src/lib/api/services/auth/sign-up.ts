import { client } from '../../client'
import type { SignUpDto, Token } from './types'

export const SIGN_UP_ENDPOINT = '/auth/sign-up'

export const signUp = async (data: SignUpDto): Promise<Token> => {
  const response = await client.post<Token>(SIGN_UP_ENDPOINT, data)

  return response.data
}
