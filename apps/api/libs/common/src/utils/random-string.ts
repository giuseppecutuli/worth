import * as crypto from 'node:crypto'

export const randomString = (len: number) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex')
    .slice(0, len)
    .toUpperCase()
}
