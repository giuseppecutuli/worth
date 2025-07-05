import { client } from '../../client'
import type { PaginatedResponse } from '../../types'
import type { AccountCategory, AccountCategoryListDto } from './types'

export const ACCOUNT_CATEGORY_LIST_ENDPOINT = '/account-categories'

export type AccountCategoryListParams = {
  query: AccountCategoryListDto
}

export const accountCategoryList = async ({
  query,
}: AccountCategoryListParams): Promise<PaginatedResponse<AccountCategory>> => {
  const response = await client.get<PaginatedResponse<AccountCategory>>(
    ACCOUNT_CATEGORY_LIST_ENDPOINT,
    {
      params: query,
    },
  )

  return response.data
}
