export interface Config {
  nest: NestConfig
  cors: CorsConfig
  swagger: SwaggerConfig
  jwt: JwtConfig
}

export interface JwtConfig {
  secret: string
  expiresIn: string
  refreshSecret: string
  refreshExpiresIn: string
}

export interface NestConfig {
  port: number
}

export interface CorsConfig {
  enabled: boolean
}

export interface SwaggerConfig {
  enabled: boolean
  title: string
  description: string
  version: string
  path: string
}
