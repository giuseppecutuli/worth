import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/__auth')({
  component: AuthLayout,
  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.auth
    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
})

function AuthLayout() {
  return (
    <div className="p-2 h-full">
      <h1>Authenticated Route</h1>
      <p>This route's content is only visible to authenticated users.</p>
      <hr />
      <Outlet />
    </div>
  )
}
