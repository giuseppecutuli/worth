import { Button, Checkbox, Group, Paper, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { Link } from '@/components/Link'

export const LoginForm: React.FC = () => {
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
      rememberMe: false,
    },
    validate: zodResolver(schema),
  })

  return (
    <Paper withBorder shadow="sm" p={22} mt={30} mb={30} radius="md">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label={t('form.email')}
          placeholder={t('form.enterEmail')}
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
        <Group justify="space-between" mt="lg">
          <Checkbox label={t('form.rememberMe')} key={form.key('rememberMe')} {...form.getInputProps('rememberMe')} />
          <Link to="/forgot-password" size="sm">
            {t('form.forgotPassword')}
          </Link>
        </Group>
        <Button type="submit" fullWidth mt="xl" radius="md">
          {t('form.login.submit')}
        </Button>
      </form>
    </Paper>
  )
}
