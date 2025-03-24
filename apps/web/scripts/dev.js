import * as dotenv from 'dotenv';
import * as cli from 'next/dist/cli/next-dev.js';

dotenv.config();

cli.nextDev({
  port: process.env.PORT || 3000,
  hostname: process.env.HOSTNAME || '0.0.0.0',
  turbopack: true,
});
