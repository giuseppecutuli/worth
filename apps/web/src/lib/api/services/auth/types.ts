export interface SignUpDto {
  email: string
  password: string
  first_name: string
  last_name: string
}

export interface SignInDto {
  email: string
  password: string
}

export interface RefreshTokenDto {
  token: string
}

export interface ForgotPasswordDto {
  email: string
}

export interface ResetPasswordDto {
  token: string
  password: string
}

export interface SignOutDto {
  refresh_token: string
}

export interface Token {
  access_token: string
  refresh_token: string
  expiration_date: string
}
