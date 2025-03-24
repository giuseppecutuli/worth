import * as dotenv from 'dotenv'
import * as cli from 'next/dist/cli/next-start.js'

dotenv.config()

cli.nextStart({
  port: process.env.PORT || 3000,
  hostname: process.env.HOSTNAME || '0.0.0.0',
})
