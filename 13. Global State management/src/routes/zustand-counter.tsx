import { Button } from '@/components/ui/button'
import { useZustandStore, useZustandUserStore } from '@/store/zustandStore'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/zustand-counter')({
  component: RouteComponent,
})

const functionOutsideComponent = () => {
  const count = useZustandStore.getState().count;
  const initialCount = useZustandStore.getInitialState().count
  console.log(count);
  console.log(initialCount);
}

function RouteComponent() {
  const count = useZustandStore((state) => state.count)
  const increment = useZustandStore((state) => state.increment)
  const incrementAsync = useZustandStore((state) => state.incrementAsync)
  const decrement = useZustandStore((state) => state.decrement)
  const reset = useZustandStore((state) => state.reset)

  const { user, loading, error, fetchUser, fetchNextUser } = useZustandUserStore()

  useEffect(() => {
    // Fetch the first user on component mount
    fetchUser(1)
  }, [fetchUser])

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Counter Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Zustand Store - Counter</h1>
        <p className="mt-4 text-red-700 text-xl">Current Count: {count}</p>

        <div className='flex justify-center gap-2 mt-4'>
          <Button onClick={increment}>Increment Count</Button>
          <Button onClick={incrementAsync}>IncrementAsync Count</Button>
          <Button onClick={reset}>Reset Count</Button>
          <Button onClick={decrement}>Decrement Count</Button>
          <Button onClick={functionOutsideComponent}>Log count in a function</Button>
        </div>
      </div>

      {/* User Section */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Zustand Store - User Data</h2>

        {loading && (
          <div className="text-center">
            <p className="text-blue-600">Loading user...</p>
          </div>
        )}

        {error && (
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
            <Button onClick={() => fetchUser(1)} className="mt-4">
              Retry
            </Button>
          </div>
        )}

        {user && !loading && (
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">User #{user.id}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
              </div>
              <div>
                <p><strong>Website:</strong> {user.website}</p>
                <p><strong>Company:</strong> {user.company.name}</p>
                <p><strong>City:</strong> {user.address.city}</p>
                <p><strong>Street:</strong> {user.address.street}</p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Button
            onClick={fetchNextUser}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Loading...' : 'Fetch Next User'}
          </Button>
        </div>
      </div>
    </div>
  )
}
