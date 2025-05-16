import { client } from '../../client'
import type { ForgotPasswordDto } from './types'

export const FORGOT_PASSWORD_ENDPOINT = '/auth/forgot-password'

export const forgotPassword = async (data: ForgotPasswordDto): Promise<void> => {
  await client.post(FORGOT_PASSWORD_ENDPOINT, data)
}
