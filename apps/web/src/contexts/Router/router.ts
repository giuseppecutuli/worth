import { createRouter } from '@tanstack/react-router'

import { routeTree } from '@/routeTree.gen'

import type { AuthContextType } from '../Auth'

export type RouterContext = {
  auth: AuthContextType
}

const initialContext: RouterContext = {
  auth: undefined!,
}

export const reactRouter = createRouter({
  routeTree,
  context: initialContext,
})
