import { UnprocessableEntityException } from '@nestjs/common'
import { ValidationError } from 'class-validator'

/**
 * Custom exception factory for validation errors.
 * @param errors - Array of validation errors.
 * @returns {UnprocessableEntityException} - An instance of UnprocessableEntityException with formatted error messages.
 */
export const validationExceptionFactory = (errors: ValidationError[]) => {
  const formatError = (errors: ValidationError[]) => {
    const errMsg = {}
    errors.forEach((error: ValidationError) => {
      errMsg[error.property] = error?.children?.length ? [formatError(error.children)] : [...Object.values(error.constraints || {})]
    })
    return errMsg
  }
  return new UnprocessableEntityException(formatError(errors))
}
