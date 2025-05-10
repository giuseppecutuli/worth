import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__auth/')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <section className="grid gap-2 p-2">
      <p>You are currently on the dashboard route.</p>
    </section>
  )
}
