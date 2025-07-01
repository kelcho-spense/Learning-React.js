import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/drafts')({
  component: DraftsComponent,
})

function DraftsComponent() {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Drafts</h1>
      <p className="mb-2">Manage your draft blog posts here.</p>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p>No drafts available at the moment.</p>
      </div>
    </div>
  )
}
