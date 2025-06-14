import { Container, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { Link } from '@/components/Link'
import { Logo } from '@/components/Logo'
import { RegisterForm } from '@/components/RegisterForm'

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container size={420} my={40}>
      <Logo justify="center" />

      <RegisterForm />

      <Text ta="center" size="md">
        {t('form.register.alreadyHaveAccount')}&nbsp;
        <Link to="/login">{t('form.register.login')}</Link>
      </Text>
    </Container>
  )
}
