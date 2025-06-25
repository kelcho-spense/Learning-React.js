import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {

  const [count, setCount] = useState(0)
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Local State</h1>
      <p className="mt-4 text-red-700 text-xl">Current Count: {count}</p>

      <div className='flex justify-center gap-2 mt-4'>
        <Button onClick={() => setCount(prev => prev + 1)}>Increment Count</Button>
        <Button onClick={() => setCount(0)}>Reset Count</Button>
        <Button onClick={() => setCount(prev => prev - 1)}>Decrement Count</Button>
      </div>
    </div>
  )
}
