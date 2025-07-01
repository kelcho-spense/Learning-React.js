import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/me')({
  component: MyAccountComponent,
})

function MyAccountComponent() {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <p className="mb-2">Manage your account settings and profile here.</p>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p>Account settings will be displayed here.</p>
      </div>
    </div>
  )
}
