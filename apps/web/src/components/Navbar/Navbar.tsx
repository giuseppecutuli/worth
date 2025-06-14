import { Box, Code, Flex, Group } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconLogout,
  IconReceipt2,
  IconSettings,
} from '@tabler/icons-react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo'
import { NavLink, type NavLinkProps } from '@/components/NavLink'
import { UserButton } from '@/components/UserButton'
import { useAuthentication } from '@/hooks'

import classes from './Navbar.module.scss'

const data: NavLinkProps[] = [
  { to: '', label: 'Notifications', icon: IconBellRinging },
  { to: '/other' as any, label: 'Billing', icon: IconReceipt2 },
  { to: '/other' as any, label: 'Security', icon: IconFingerprint },
  { to: '/other' as any, label: 'SSH Keys', icon: IconKey },
  { to: '/other' as any, label: 'Databases', icon: IconDatabaseImport },
  { to: '/other' as any, label: 'Authentication', icon: Icon2fa },
  { to: '/settings', label: 'Settings', icon: IconSettings },
]

export const Navbar: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [collapsed, setCollapsed] = useState(isMobile)
  const { signOut } = useAuthentication()

  useEffect(() => {
    setCollapsed(isMobile)
  }, [isMobile])

  return (
    <Flex
      direction="column"
      p="md"
      className={clsx(classes.navbar, { [classes['navbar--collapsed']!]: collapsed })}
    >
      <Box flex={1}>
        <Group
          className={classes.header}
          pb="md"
          mb="md"
          justify={collapsed ? 'center' : 'space-between'}
        >
          <Logo collapsed={collapsed} />
          <Code hidden={collapsed} fw={700}>
            v1.0.0
          </Code>
        </Group>
        <Flex direction="column" align={collapsed ? 'center' : 'flex-start'} gap="xs">
          {data.map((item) => (
            <NavLink
              key={item.label}
              collapsed={collapsed}
              label={item.label}
              to={item.to}
              icon={item.icon}
            />
          ))}
        </Flex>
      </Box>

      <Box>
        <UserButton collapsed={collapsed} />
        <Box m="md" className={classes.divider} />
        <NavLink
          collapsed={collapsed}
          label="Collapse"
          icon={collapsed ? IconLayoutSidebarRightCollapse : IconLayoutSidebarLeftCollapse}
          onClick={() => setCollapsed(!collapsed)}
        />
        <NavLink collapsed={collapsed} label="Logout" icon={IconLogout} onClick={signOut.mutate} />
      </Box>
    </Flex>
  )
}
