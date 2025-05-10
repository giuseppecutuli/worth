import { reactRouter } from '@/components/Router'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof reactRouter
  }
}
