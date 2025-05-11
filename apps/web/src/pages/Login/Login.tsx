import { Anchor, Container, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { LoginForm } from '@/components/LoginForm'
import { Logo } from '@/components/Logo'

export const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <Container size={420} my={40}>
      <Logo justify="center" />

      <LoginForm />

      <Text ta="center" size="md">
        {t('form.login.notHaveAccount')}&nbsp;<Anchor>{t('form.login.createAccount')}</Anchor>
      </Text>
    </Container>
  )
}
