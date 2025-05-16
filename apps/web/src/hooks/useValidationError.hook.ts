import type { UseFormReturnType } from '@mantine/form'
import { useEffect } from 'react'

import type { ApiError } from '@/lib/api'

export const useValidationError = (form: UseFormReturnType<any>, error: ApiError | null) => {
  useEffect(() => {
    if (!error) {
      return
    }

    for (const [field, value] of Object.entries(error.validations || {})) {
      form.setFieldError(field, value[0])
    }
  }, [error])
}
