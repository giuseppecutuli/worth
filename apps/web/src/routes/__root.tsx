import { Notifications } from '@mantine/notifications'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import type { RouterContext } from '@/contexts/Router'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Notifications />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
