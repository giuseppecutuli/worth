import { Box, Container, Flex } from '@mantine/core'
import { Outlet } from '@tanstack/react-router'

import { Navbar } from '@/components'

export const AuthLayout: React.FC = () => {
  return (
    <Flex style={{ overflow: 'hidden' }} maw="100vw">
      <Navbar />
      <Box flex={1} style={{ minWidth: 0 }}>
        <Container py="md">
          <Outlet />
        </Container>
      </Box>
    </Flex>
  )
}
