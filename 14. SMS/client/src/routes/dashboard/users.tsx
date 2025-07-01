import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users')({
  component: UsersComponent,
})

function UsersComponent() {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <p className="mb-2">Manage users and their permissions here.</p>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p>No users to display at the moment.</p>
      </div>
    </div>
  )
}
