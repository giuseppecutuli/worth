import { client } from '../../client'
import type { User } from '../users'

export const ME_ENDPOINT = '/auth/me'

export const me = async (): Promise<User> => {
  const response = await client.get<User>(ME_ENDPOINT)

  return response.data
}
