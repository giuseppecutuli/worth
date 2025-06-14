import type { BoxProps, ComboboxData } from '@mantine/core'
import type { UseFormReturnType } from '@mantine/form'
import type { ReactNode } from 'react'
import type { ZodType } from 'zod/v4'

export type FieldType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'checkbox'
  | 'select'
  | 'textarea'
  | 'date'
  | 'file'
  | 'radio'

export type FieldOption = {
  value: string | number
  label: string
  disabled?: boolean
}

export type FieldConfig = {
  type: FieldType
  name: string
  label: string
  defaultValue?: string | number | boolean
  before?: React.ReactNode
  after?: React.ReactNode
  schema?: ZodType
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  description?: string
  error?: string
  options?: FieldOption[]
  data?: ComboboxData
  min?: number // For number fields
  max?: number // For number fields
  rows?: number // For textarea
  accept?: string // For file input
  icon?: ReactNode // For inputs with icons
}

export type FormFieldProps = {
  index: number
  boxProps?: BoxProps
  field: FieldConfig
  form: UseFormReturnType<any, any>
}
