import { Container, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { Link } from '@/components/Link'
import { Logo } from '@/components/Logo'
import { RegisterForm } from '@/components/RegisterForm'
import { useAuthentication } from '@/hooks'

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation()
  const {
    signUp: { mutate, error, status },
  } = useAuthentication()

  return (
    <Container size={420} my={40}>
      <Logo justify="center" />

      <RegisterForm onSubmit={mutate} error={error} loading={status === 'pending'} />

      <Text ta="center" size="md">
        {t('form.register.alreadyHaveAccount')}&nbsp;<Link to="/login">{t('form.register.login')}</Link>
      </Text>
    </Container>
  )
}
