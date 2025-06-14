import { Box, Container, Flex } from '@mantine/core'
import { Outlet } from '@tanstack/react-router'

import { Navbar } from '@/components'

export const AuthLayout: React.FC = () => {
  return (
    <Flex>
      <Navbar />
      <Box w="100%">
        <Container py="md">
          <Outlet />
        </Container>
      </Box>
    </Flex>
  )
}
