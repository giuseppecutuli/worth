import { RouterProvider as TanstackReactRouter } from '@tanstack/react-router'

import { useAuth } from '@/contexts/Auth'

import { reactRouter, type RouterContext } from './router'

export const RouterProvider = () => {
  const auth = useAuth()

  const context: RouterContext = {
    auth,
  }

  return <TanstackReactRouter router={reactRouter} context={context} />
}
