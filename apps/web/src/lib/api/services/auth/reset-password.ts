import { client } from '../../client'
import type { ResetPasswordDto } from './types'

export const RESET_PASSWORD_ENDPOINT = '/auth/reset-password'

export const resetPassword = async (data: ResetPasswordDto): Promise<void> => {
  await client.post(RESET_PASSWORD_ENDPOINT, data)
}
