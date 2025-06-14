import { Paper } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { z } from 'zod/v4'

import { useAuthentication } from '@/hooks'

import { Form } from '../Form'
import type { FieldConfig } from '../FormField'

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation()

  const {
    signUp: { mutate, error, status },
  } = useAuthentication()

  const fields: FieldConfig[] = [
    {
      name: 'first_name',
      label: t('form.firstName'),
      placeholder: t('form.enterFirstName'),
      type: 'text',
      defaultValue: '',
      schema: z.string().min(1, { error: t('form.enterFirstName') }),
    },
    {
      name: 'last_name',
      label: t('form.lastName'),
      placeholder: t('form.enterLastName'),
      type: 'text',
      defaultValue: '',
      schema: z.string().min(1, { error: t('form.enterLastName') }),
    },
    {
      name: 'email',
      label: t('form.email'),
      placeholder: t('form.enterEmail'),
      type: 'email',
      schema: z.email({ error: t('form.invalidEmail') }),
    },
    {
      name: 'password',
      label: t('form.password'),
      placeholder: t('form.enterPassword'),
      defaultValue: '',
      type: 'password',
      schema: z.string().min(8, { error: t('form.passwordInvalid') }),
    },
  ]

  return (
    <Paper withBorder shadow="sm" p={22} mt={30} mb={30} radius="md">
      <Form fields={fields} onSubmit={mutate} error={error} loading={status === 'pending'} />
    </Paper>
  )
}
