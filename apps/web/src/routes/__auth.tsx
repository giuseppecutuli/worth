import { createFileRoute, redirect } from '@tanstack/react-router'

import { AuthLayout } from '@/components/AuthLayout'

export const Route = createFileRoute('/__auth')({
  component: AuthLayout,
  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.auth

    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
})
