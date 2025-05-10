import { getOsEnv, getOsEnvNumber } from '@/common/utils'

import { Config } from './config.interface'

export default (): Config => ({
  nest: {
    port: getOsEnvNumber('PORT', 3000),
  },
  cors: {
    enabled: true,
  },
  jwt: {
    secret: getOsEnv('JWT_SECRET'),
    expiresIn: getOsEnv('JWT_EXPIRES_IN', '1h'),
    refreshSecret: getOsEnv('JWT_REFRESH_SECRET'),
    refreshExpiresIn: getOsEnv('JWT_REFRESH_EXPIRES_IN', '30d'),
  },
  swagger: {
    enabled: true,
    title: 'W.O.R.T.H. API',
    description: 'Documentation for W.O.R.T.H. API',
    version: '1.0',
    path: 'docs',
  },
})
