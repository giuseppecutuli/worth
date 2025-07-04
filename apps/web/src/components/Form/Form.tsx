import { Button, type ButtonProps, Text } from '@mantine/core'
import { useForm, type UseFormReturnType } from '@mantine/form'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useImperativeHandle, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isDefined } from 'remeda'
import z, { type ZodType } from 'zod/v4'

import { type FieldConfig, FormField } from '@/components'
import { useValidationError } from '@/hooks'
import type { ApiError } from '@/lib/api'

export type FormRef = {
  form: UseFormReturnType<any, any>
}

type FormProps<T = any> = {
  fields: FieldConfig[]
  onSubmit: (values: T) => void
  error?: ApiError | null
  loading?: boolean
  extraValidations?: Array<{
    validate: (data: T) => boolean
    params: any
  }>
  submit?: {
    text?: string
    props?: ButtonProps
  }
  ref?: React.RefObject<FormRef | null>
}

export const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  error,
  loading,
  submit = {},
  extraValidations,
  ref,
}) => {
  const { t } = useTranslation()
  const schema = useMemo(() => {
    const validationFields = fields.reduce<Record<string, ZodType>>((acc, field) => {
      if (!field.schema) {
        return acc
      }

      acc[field.name] = field.schema

      return acc
    }, {})

    let schema = z.object(validationFields)

    if (extraValidations) {
      extraValidations.forEach(({ validate, params }) => {
        schema = schema.refine(validate, params)
      })
    }

    return schema
  }, [fields])

  const initialValues = useMemo(() => {
    return fields.reduce<Record<string, any>>((acc, field) => {
      if (isDefined(field.defaultValue)) {
        acc[field.name] = field.defaultValue
      }

      return acc
    }, {})
  }, [fields])

  const form = useForm({
    mode: 'uncontrolled',
    initialValues,
    validate: zod4Resolver(schema),
  })

  useValidationError(form, error)

  useImperativeHandle(ref, () => ({
    form,
  }))

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <FormField index={index} key={field.name} field={field} form={form} />
      ))}
      <Button
        type="submit"
        disabled={loading}
        loading={loading}
        mt="xl"
        radius="md"
        {...submit.props}
      >
        {submit.text || t('form.submit')}
      </Button>
      {error?.message && (
        <Text mt="sm" c="red">
          {error.message}
        </Text>
      )}
    </form>
  )
}
