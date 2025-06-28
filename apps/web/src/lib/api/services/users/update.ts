import { client } from '../../client'
import type { UpdateUserDto, User } from './types'

export const UPDATE_USER_ENDPOINT = '/users/:id'

export type UpdateUserParams = {
  id: string
  data: UpdateUserDto
}

export const updateUser = async ({ id, data }: UpdateUserParams): Promise<User> => {
  const endpoint = UPDATE_USER_ENDPOINT.replace(':id', id)

  const response = await client.put<User>(endpoint, data)

  return response.data
}
