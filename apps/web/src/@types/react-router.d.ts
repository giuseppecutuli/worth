import { reactRouter } from '@/contexts/Router'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof reactRouter
  }
}
