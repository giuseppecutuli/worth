import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { IAccount, ITransaction } from './interfaces'

/**
 * Mock open banking service
 * This is a mock implementation of the open banking service
 * for this project does not use real data
 */
@Injectable()
export class OpenBankingService {
  /**
   * Generate a random transaction
   *
   * @param date - The date of the transaction
   * @returns - The transaction
   */
  private generateTransaction(date: Date): ITransaction {
    return {
      id: faker.string.uuid(),
      amount: faker.finance.amount({ min: -500, max: 2000 }),
      date,
      currency: 'EUR',
      description: faker.finance.transactionDescription(),
      type: faker.finance.transactionType(),
    }
  }

  /**
   * Generate a random account
   *
   * @param name - The name of the account
   * @returns - The account
   */
  private generateAccount(name: string): IAccount {
    return {
      id: faker.string.uuid(),
      name,
      iban: faker.finance.iban(),
      currency: 'EUR',
    }
  }

  /**
   * Retrieve an account
   *
   * @param name - The name of the account
   * @returns - The account
   */
  public retrieveAccount(name: string): IAccount {
    return this.generateAccount(name)
  }

  /**
   * Retrieve transactions for an account
   *
   * @param accountId - The id of the account
   * @param from - The start date of the transactions
   * @param to - The end date of the transactions
   * @returns - The transactions
   */
  public retrieveTransactions(_accountId: string, from: Date, to: Date): ITransaction[] {
    const count = faker.number.int({ min: 1, max: 50 })

    return Array.from({ length: count }).map(() => {
      const date = faker.date.between({ from, to })
      const transaction = this.generateTransaction(date)

      return transaction
    })
  }
}
