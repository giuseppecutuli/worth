export interface ApiError {
  message?: string
  statusCode: number
  error?: string
  validations?: Record<string, string[]>
}
