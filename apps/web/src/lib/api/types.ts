export interface ApiError {
  message?: string
  statusCode: number
  error?: string
  validations?: Record<string, string[]>
}

export interface PaginateDto {
  page?: number
  limit?: number
  order?: string
  include?: string[]
}

export interface PaginatedResponse<T> {
  count: number
  data: T[]
  page: number
  limit: number
  total_pages: number
}
