import { Flex } from '@mantine/core'
import { Outlet } from '@tanstack/react-router'

import { Navbar } from '../Navbar'

export const AuthLayout: React.FC = () => {
  return (
    <Flex>
      <Navbar />
      <Outlet />
    </Flex>
  )
}
