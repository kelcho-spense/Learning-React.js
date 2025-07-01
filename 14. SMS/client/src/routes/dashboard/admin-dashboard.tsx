import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/admin-dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/admin-dashboard"!</div>
}
