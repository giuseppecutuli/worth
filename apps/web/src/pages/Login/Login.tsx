import { Container, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { Link } from '@/components/Link'
import { LoginForm } from '@/components/LoginForm'
import { Logo } from '@/components/Logo'
import { useAuthentication } from '@/hooks'

export const LoginPage: React.FC = () => {
  const { t } = useTranslation()
  const {
    signIn: { mutate, error, status },
  } = useAuthentication()

  return (
    <Container size={420} my={40}>
      <Logo justify="center" />

      <LoginForm onSubmit={mutate} error={error} loading={status === 'pending'} />

      <Text ta="center" size="md">
        {t('form.login.notHaveAccount')}&nbsp;<Link to="/register">{t('form.login.createAccount')}</Link>
      </Text>
    </Container>
  )
}
