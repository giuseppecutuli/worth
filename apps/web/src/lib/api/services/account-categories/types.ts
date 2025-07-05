import type { PaginateDto } from '../../types'

export interface AccountCategory {
  id: string
  name: string
  user_id: string
  created_at: Date
  updated_at: Date
}

export interface AccountCategoryListDto extends PaginateDto {
  name?: string
}
