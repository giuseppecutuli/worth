import { randomString, lcFirst } from './string'

describe('String Utils', () => {
  describe('randomString', () => {
    it('should generate a random string of the specified length', () => {
      const length = 10
      const result = randomString(length)
      expect(result).toHaveLength(length)
    })
  })

  describe('lcFirst', () => {
    it('should lowercase the first character of the string', () => {
      const input = 'Hello World'
      const result = lcFirst(input)
      expect(result).toBe('hello World')
    })

    it('should return an empty string if input is not a string', () => {
      const input = 123 as unknown as string
      const result = lcFirst(input)
      expect(result).toBe('')
    })

    it('should return the same string if the first character is already lowercase', () => {
      const input = 'hello World'
      const result = lcFirst(input)
      expect(result).toBe(input)
    })
  })
})
