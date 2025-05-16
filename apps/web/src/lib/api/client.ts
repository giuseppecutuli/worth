import { QueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

import { ACCESS_TOKEN_KEY, EXPIRATION_DATE_KEY, LOGOUT_EVENT, REFRESH_TOKEN_KEY } from '../constants'
import { REFRESH_TOKEN_ENDPOINT, refreshToken } from './services/auth/refresh-token'
import type { ApiError } from './types'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const formatError = (error: AxiosError): ApiError => {
  const response = error.response!
  const isValidationError = response.status === 422
  const validations = isValidationError ? response.data : undefined
  const message = (response.data as { message?: string }).message

  return {
    statusCode: response.status,
    validations: validations as ApiError['validations'],
    message,
  }
}

/**
 * Request interceptor to add the access token to the request headers.
 */
client.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)

    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`
    }

    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * Response interceptor to refresh the token if it has expired.
 */
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the request failed due to an expired token, refresh it.
    // Do not refresh the token if the request is already a refresh token request.
    // Do not refresh the token if the request has already been retried.
    if (error.response.status === 401 && originalRequest.url !== REFRESH_TOKEN_ENDPOINT && !originalRequest._retry) {
      // Mark the request as retried to avoid infinite loops.
      originalRequest._retry = true
      try {
        const token = localStorage.getItem(REFRESH_TOKEN_KEY)!
        const { access_token, refresh_token, expiration_date } = await refreshToken({ token })

        localStorage.setItem(ACCESS_TOKEN_KEY, access_token)
        localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
        localStorage.setItem(EXPIRATION_DATE_KEY, expiration_date)

        return client(originalRequest)
      } catch (err: unknown) {
        const refreshError = err as AxiosError

        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        localStorage.removeItem(EXPIRATION_DATE_KEY)

        window.dispatchEvent(new Event(LOGOUT_EVENT))

        return Promise.reject(formatError(refreshError))
      }
    }

    return Promise.reject(formatError(error))
  },
)

const queryClient = new QueryClient()

export { client, queryClient }
