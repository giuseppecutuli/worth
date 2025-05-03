import { getOsEnv, getOsEnvNumber } from './env'

describe('Env', () => {
  describe('getOsEnv', () => {
    it('should return the value of the environment variable if set', () => {
      process.env.TEST_VAR = 'test_value'

      expect(getOsEnv('TEST_VAR')).toBe('test_value')
    })

    it('should return the fallback value if the environment variable is not set', () => {
      delete process.env.TEST_VAR

      expect(getOsEnv('TEST_VAR', 'fallback_value')).toBe('fallback_value')
    })
  })

  describe('getOsEnvNumber', () => {
    it('should return the parsed number from the environment variable if set and valid', () => {
      process.env.TEST_VAR = '42'

      expect(getOsEnvNumber('TEST_VAR', 0)).toBe(42)
    })

    it('should return the fallback value if the environment variable is not set or invalid', () => {
      delete process.env.TEST_VAR

      expect(getOsEnvNumber('TEST_VAR', 10)).toBe(10)
    })
  })
})
