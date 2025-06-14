import { Paper } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { type FieldConfig, Form, Link } from '@/components'
import { useAuthentication } from '@/hooks'

export const LoginForm: React.FC = () => {
  const { t } = useTranslation()
  const {
    signIn: { mutate, error, status },
  } = useAuthentication()

  const fields: FieldConfig[] = [
    {
      name: 'email',
      label: t('form.email'),
      placeholder: t('form.enterEmail'),
      type: 'email',
      schema: z.string().email({ message: t('form.invalidEmail') }),
    },
    {
      name: 'password',
      label: t('form.password'),
      placeholder: t('form.enterPassword'),
      type: 'password',
      schema: z.string().min(8, { message: t('form.passwordInvalid') }),
    },
    {
      name: 'rememberMe',
      label: t('form.rememberMe'),
      type: 'checkbox',
      defaultValue: false,
      schema: z.boolean().optional(),
      after: (
        <Link to="/forgot-password" size="sm">
          {t('form.forgotPassword')}
        </Link>
      ),
    },
  ]

  return (
    <Paper withBorder shadow="sm" p={22} mt={30} mb={30} radius="md">
      <Form
        fields={fields}
        onSubmit={mutate}
        error={error}
        loading={status === 'pending'}
        submit={{
          text: t('form.login.submit'),
        }}
      />
    </Paper>
  )
}
