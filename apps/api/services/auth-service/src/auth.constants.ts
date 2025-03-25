export const PASSWORD_MIN_LENGTH = 8

export const AuthMessages = {
  RESET_TOKEN_SENT: 'Reset password token has been sent to your email',
}

export const AuthErrors = {
  SIGN_IN_INVALID_CREDENTIALS: 'Invalid credentials',
  SIGN_UP_EMAIL_ALREADY_EXISTS: 'An user with this email already exists',
  REFRESH_TOKEN_NOT_FOUND: 'Unable to find refresh token associated with this user',
  FORGOT_PASSWORD_USER_NOT_FOUND: 'Unable to find user with this email',
  RESET_PASSWORD_TOKEN_NOT_VALID: 'Reset password token is not valid',
  REFRESH_TOKEN_INVALID: 'Refresh token is invalid',
}

export const RESET_TOKEN_DURATION = 1 // Hours
