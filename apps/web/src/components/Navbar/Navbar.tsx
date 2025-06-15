import { Box, Code, Flex, Group } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go'
import { LuBellRing, LuLogOut, LuReceipt, LuSettings } from 'react-icons/lu'

import { Logo } from '@/components/Logo'
import { NavLink, type NavLinkProps } from '@/components/NavLink'
import { UserButton } from '@/components/UserButton'
import { useAuthentication } from '@/hooks'

import classes from './Navbar.module.scss'

const data: NavLinkProps[] = [
  { to: '/', label: 'Notifications', icon: LuBellRing },
  { to: '/other' as any, label: 'Billing', icon: LuReceipt },
  { to: '/settings', label: 'Settings', icon: LuSettings },
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
          icon={collapsed ? GoSidebarCollapse : GoSidebarExpand}
          onClick={() => setCollapsed(!collapsed)}
        />
        <NavLink collapsed={collapsed} label="Logout" icon={LuLogOut} onClick={signOut.mutate} />
      </Box>
    </Flex>
  )
}
