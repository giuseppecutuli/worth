import { Button, Paper, PasswordInput, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { useValidationError } from '@/hooks'
import type { ApiError, SignUpDto } from '@/lib/api'

type Props = {
  onSubmit: (values: SignUpDto) => void
  error: ApiError | null
  loading?: boolean
}

export const RegisterForm: React.FC<Props> = ({ onSubmit, error, loading }) => {
  const { t } = useTranslation()

  const schema = z.object({
    email: z.string().email({ message: t('form.invalidEmail') }),
    password: z.string().min(8, { message: t('form.passwordInvalid') }),
    rememberMe: z.boolean().optional(),
  })

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    },
    validate: zodResolver(schema),
  })

  useValidationError(form, error)

  return (
    <Paper withBorder shadow="sm" p={22} mt={30} mb={30} radius="md">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label={t('form.firstName')}
          placeholder={t('form.enterFirstName')}
          radius="md"
          key={form.key('first_name')}
          {...form.getInputProps('first_name')}
        />
        <TextInput
          label={t('form.lastName')}
          placeholder={t('form.enterLastName')}
          mt="md"
          radius="md"
          key={form.key('last_name')}
          {...form.getInputProps('last_name')}
        />
        <TextInput
          label={t('form.email')}
          placeholder={t('form.enterEmail')}
          mt="md"
          radius="md"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label={t('form.password')}
          placeholder={t('form.enterPassword')}
          mt="md"
          radius="md"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Button type="submit" disabled={loading} loading={loading} fullWidth mt="xl" radius="md">
          {t('form.login.submit')}
        </Button>
        {error?.message && (
          <Text mt="sm" c="red">
            {error.message}
          </Text>
        )}
      </form>
    </Paper>
  )
}
