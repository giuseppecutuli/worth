import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod/v4'

import { type FieldConfig, Form, type FormRef } from '@/components'
import { useUser } from '@/hooks/useUser.hook'

export const SecurityForm: React.FC = () => {
  const { t } = useTranslation()
  const {
    user,
    updateUser: { status, mutate, error, isSuccess },
  } = useUser()
  const ref = useRef<FormRef>(null)

  const fields: FieldConfig[] = [
    {
      name: 'current_password',
      label: t('form.security.currentPassword'),
      placeholder: '******',
      type: 'password',
      schema: z.string().min(8),
    },
    {
      name: 'new_password',
      label: t('form.security.newPassword'),
      placeholder: t('form.security.enterNewPassword'),
      type: 'password',
      schema: z.string().min(8),
    },
    {
      name: 'confirm_new_password',
      label: t('form.security.confirmPassword'),
      placeholder: t('form.security.enterConfirmPassword'),
      type: 'password',
      schema: z.string().min(8),
    },
  ]

  const extraValidation = {
    validate: (data: Record<string, string>) => data.new_password === data.confirm_new_password,
    params: {
      message: t('form.security.passwordsDoNotMatch'),
      path: ['confirm_new_password'],
    },
  }

  useEffect(() => {
    if (isSuccess) {
      ref.current?.form.reset()
    }
  }, [isSuccess])

  if (!user) {
    return null
  }

  return (
    <Form
      fields={fields}
      loading={status === 'pending'}
      extraValidations={[extraValidation]}
      onSubmit={mutate}
      error={error}
      ref={ref}
    />
  )
}
