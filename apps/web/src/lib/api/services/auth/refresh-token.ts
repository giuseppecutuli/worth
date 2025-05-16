import { client } from '../../client'
import type { RefreshTokenDto, Token } from './types'

export const REFRESH_TOKEN_ENDPOINT = '/auth/refresh-token'

export const refreshToken = async (data: RefreshTokenDto): Promise<Token> => {
  const response = await client.post<Token>(REFRESH_TOKEN_ENDPOINT, data)

  return response.data
}
