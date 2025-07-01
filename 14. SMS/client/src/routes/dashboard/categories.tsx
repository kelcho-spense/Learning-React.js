import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/categories')({
  component: CategoriesComponent,
})

function CategoriesComponent() {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <p className="mb-2">Manage your blog categories here.</p>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p>No categories available at the moment.</p>
      </div>
    </div>
  )
}
