import { client } from '../../client'
import type { User } from './types'

export const ME_ENDPOINT = '/auth/me'

export const me = async (): Promise<User> => {
  const response = await client.post<User>(ME_ENDPOINT)

  return response.data
}
