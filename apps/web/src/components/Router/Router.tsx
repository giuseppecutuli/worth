import { createRouter, RouterProvider } from '@tanstack/react-router'

import { useAuth } from '@/contexts/Auth'
import { routeTree } from '@/routeTree.gen'

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const Router = () => {
  const auth = useAuth()

  const context = {
    auth,
  }

  return <RouterProvider router={router} context={context} />
}
