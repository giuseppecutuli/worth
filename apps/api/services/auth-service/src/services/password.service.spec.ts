import { PasswordService } from './password.service'

describe('PasswordService', () => {
  it('should be defined', () => {
    expect(PasswordService).toBeDefined()
  })

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'testPassword'
      const hashedPassword = await PasswordService.hashPassword(password)
      expect(hashedPassword).not.toEqual(password)
      expect(hashedPassword).toMatch(/^\$2[ayb]\$.{56}$/) // bcrypt hash format
    })
  })

  describe('comparePassword', () => {
    it('should return true for a valid password', async () => {
      const password = 'testPassword'
      const hashedPassword = await PasswordService.hashPassword(password)
      const isMatch = await PasswordService.validatePassword(password, hashedPassword)
      expect(isMatch).toBe(true)
    })

    it('should return false for an invalid password', async () => {
      const password = 'testPassword'
      const hashedPassword = await PasswordService.hashPassword(password)
      const isMatch = await PasswordService.validatePassword('wrongPassword', hashedPassword)
      expect(isMatch).toBe(false)
    })
  })
})
