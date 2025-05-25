import type { TablerIcon } from '@tabler/icons-react'
import { clsx } from 'clsx'
import { isString } from 'remeda'

import { Link } from '@/components/Link'
import type { FileRouteTypes } from '@/routeTree.gen'

import classes from './NavLink.module.scss'

export type NavLinkProps = {
  label: string
  to?: FileRouteTypes['to']
  icon: TablerIcon
  collapsed?: boolean
  onClick?: () => void
}

export const NavLink: React.FC<NavLinkProps> = ({ label, to, icon: Icon, onClick, collapsed }) => {
  const activeProps = isString(to) ? { className: classes['link--active'] } : undefined

  return (
    <Link
      className={clsx(classes.link, { [classes['link--collapsed']!]: collapsed })}
      to={to}
      w="100%"
      onClick={onClick}
      activeProps={activeProps}
    >
      <Icon className={classes.icon} stroke={1.5} />
      <span hidden={collapsed}>{label}</span>
    </Link>
  )
}
