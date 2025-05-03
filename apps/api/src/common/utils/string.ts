import * as crypto from 'node:crypto'

/**
 * Generates a random string of the specified length using crypto module.
 *
 * @param len - Length of the string
 * @returns {string} - Random string
 */
export const randomString = (len: number) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex')
    .slice(0, len)
    .toUpperCase()
}

/**
 * Lowercases the first character in the `string`.
 *
 * @param {String} string
 *
 * @returns {String}
 */
export const lcFirst = (string: string): string => {
  if (typeof string !== 'string') {
    return ''
  }

  if (string[0] === undefined) {
    return string
  }

  return string[0].toLowerCase() + string.slice(1)
}
