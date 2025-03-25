import { Config } from '@auth/interfaces/config.interface'
import { getOsEnv, getOsEnvNumber } from '@microservices/common'

export default (): Config => ({
  nest: {
    port: getOsEnvNumber('port', 3000),
  },
  cors: {
    enabled: true,
  },
  jwt: {
    secret: getOsEnv('JWT_SECRET'),
    expiresIn: getOsEnv('JWT_EXPIRES_IN'),
    refreshSecret: getOsEnv('JWT_REFRESH_SECRET'),
    refreshExpiresIn: getOsEnv('JWT_REFRESH_EXPIRES_IN'),
  },
  swagger: {
    enabled: true,
    title: 'W.O.R.T.H. Auth Microservice',
    description: 'Documentation for Authentication',
    version: '1.0',
    path: 'docs',
  },
})
