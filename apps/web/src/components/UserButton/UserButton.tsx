import { Avatar, Box, Group, Text, UnstyledButton } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

import { useAuth } from '@/contexts/Auth'

type Props = {
  collapsed?: boolean
}

export const UserButton: React.FC<Props> = ({ collapsed }) => {
  const { user } = useAuth()
  const initials = `${user?.first_name[0]}${user?.last_name[0]}`

  return (
    <UnstyledButton w="100%" p={collapsed ? 0 : 'md'} display="block">
      <Group>
        <Avatar color="cyan" radius="xl">
          {initials}
        </Avatar>

        <Box flex={1} hidden={collapsed}>
          <Text size="sm" fw={500}>
            {user?.first_name} {user?.last_name}
          </Text>

          <Text c="dimmed" size="xs">
            {user?.email}
          </Text>
        </Box>

        <IconChevronRight display={collapsed ? 'none' : 'block'} size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  )
}
