import { Button, Container, Group, Text, Title } from '@mantine/core'
import { useNavigate } from '@tanstack/react-router'

import Illustration from '@/assets/svg/404.svg?react'

import classes from './NotFound.module.scss'

export const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Group justify="center">
            <Button size="md" onClick={() => navigate({ to: '/' })}>
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  )
}
