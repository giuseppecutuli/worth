import { client } from '../../client'
import type { PaginatedResponse } from '../../types'
import type { Account, AccountListDto } from './types'

export const ACCOUNT_LIST_ENDPOINT = '/accounts'

export type AccountListParams = {
  query: AccountListDto
}

export const accountList = async ({
  query,
}: AccountListParams): Promise<PaginatedResponse<Account>> => {
  const response = await client.get<PaginatedResponse<Account>>(ACCOUNT_LIST_ENDPOINT, {
    params: query,
  })

  return response.data
}
