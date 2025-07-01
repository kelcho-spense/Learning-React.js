import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardComponent,
})

function DashboardComponent() {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-2">Welcome to the dashboard!</p>
      <p className="mb-2">Here you can manage your account, view statistics, and more.</p>
      <p className="mb-4">Use the navigation links to explore different sections.</p>
      <footer className="mt-8 pt-4 border-t">
        <p>Footer content goes here</p>
        <p>&copy; 2023 Your Company</p>
      </footer>
    </div>
  )
}
