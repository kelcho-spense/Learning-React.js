import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/write')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/write"!</div>
}
