import { useTranslation } from 'react-i18next'
import { z } from 'zod/v4'

import { type FieldConfig, Form } from '@/components'
import { useUser } from '@/hooks/useUser.hook'

export const AccountForm: React.FC = () => {
  const { t } = useTranslation()
  const {
    user,
    updateUser: { status, mutate, error },
  } = useUser()

  const fields: FieldConfig[] = [
    {
      name: 'first_name',
      label: t('form.firstName'),
      placeholder: t('form.enterFirstName'),
      type: 'text',
      defaultValue: user?.first_name || '',
      schema: z.string().min(1, { error: t('form.enterFirstName') }),
    },
    {
      name: 'last_name',
      label: t('form.lastName'),
      placeholder: t('form.enterLastName'),
      type: 'text',
      defaultValue: user?.last_name || '',
      schema: z.string().min(1, { error: t('form.enterLastName') }),
    },
    {
      name: 'email',
      label: t('form.email'),
      placeholder: t('form.enterEmail'),
      type: 'email',
      defaultValue: user?.email || '',
      readOnly: true,
      disabled: true,
      schema: z.email({ error: t('form.invalidEmail') }),
    },
  ]

  if (!user) {
    return null
  }

  return <Form fields={fields} loading={status === 'pending'} onSubmit={mutate} error={error} />
}
