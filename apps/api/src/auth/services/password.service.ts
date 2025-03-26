import { compare, hash } from 'bcrypt'

const HASH_SALT_ROUNDS = 10

export class PasswordService {
  static validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }

  static hashPassword(password: string): Promise<string> {
    return hash(password, HASH_SALT_ROUNDS)
  }
}
