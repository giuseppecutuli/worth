import type { PaginateDto } from '../../types'
import type { AccountCategory } from '../account-categories'

export enum AccountType {
  BANK = 'BANK',
  CASH = 'CASH',
  CRYPTO = 'CRYPTO',
  WALLET = 'WALLET',
  INVESTMENT = 'INVESTMENT',
}

export interface Account {
  id: string
  name: string
  iban: string | null
  type: AccountType
  user_id: string
  categories?: AccountCategory[]
}

export interface AccountListDto extends PaginateDto {
  name?: string
  type?: AccountType
  categories?: string[]
}
