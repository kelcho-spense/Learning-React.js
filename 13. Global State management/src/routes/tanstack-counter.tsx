import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { counterStore, handleDecrement, handleIncrement, handleIncrementAsync, handleReset, userStore, fetchUser, fetchNextUser } from '@/store/tanstackStore'
import { useEffect } from 'react'

export const Route = createFileRoute('/tanstack-counter')({
  component: RouteComponent,
})

const functionOutsideComponent = () => {
  const count = counterStore.state;
  const prevCount = counterStore.prevState;
  console.log(count);
  console.log(prevCount);
}

function RouteComponent() {
  const count = useStore(counterStore)
  const userState = useStore(userStore)

  useEffect(() => {
    // Fetch the first user on component mount
    fetchUser(1)
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Counter Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">TanStack Store - Counter</h1>
        <p className="mt-4 text-red-700 text-xl">Current Count: {count}</p>

        <div className='flex justify-center gap-2 mt-4'>
          <Button onClick={handleIncrement}>Increment Count</Button>
          <Button onClick={handleIncrementAsync}>IncrementAsync Count</Button>
          <Button onClick={handleReset}>Reset Count</Button>
          <Button onClick={handleDecrement}>Decrement Count</Button>
          <Button onClick={functionOutsideComponent}>Log count in a function</Button>
        </div>
      </div>

      {/* User Section */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold text-center mb-6">TanStack Store - User Data</h2>

        {userState.loading && (
          <div className="text-center">
            <p className="text-blue-600">Loading user...</p>
          </div>
        )}

        {userState.error && (
          <div className="text-center">
            <p className="text-red-600">Error: {userState.error}</p>
            <Button onClick={() => fetchUser(1)} className="mt-4">
              Retry
            </Button>
          </div>
        )}

        {userState.user && !userState.loading && (
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">User #{userState.user.id}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Name:</strong> {userState.user.name}</p>
                <p><strong>Username:</strong> {userState.user.username}</p>
                <p><strong>Email:</strong> {userState.user.email}</p>
                <p><strong>Phone:</strong> {userState.user.phone}</p>
              </div>
              <div>
                <p><strong>Website:</strong> {userState.user.website}</p>
                <p><strong>Company:</strong> {userState.user.company.name}</p>
                <p><strong>City:</strong> {userState.user.address.city}</p>
                <p><strong>Street:</strong> {userState.user.address.street}</p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Button
            onClick={fetchNextUser}
            disabled={userState.loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {userState.loading ? 'Loading...' : 'Fetch Next User'}
          </Button>
        </div>
      </div>
    </div>
  )
}
