import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/__guest')({
  component: () => <Outlet />,
  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.auth

    if (isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})
