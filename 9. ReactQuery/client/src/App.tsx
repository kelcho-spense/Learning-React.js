import Profile from "./components/profiles/Profile"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client
export const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Profile />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}

export default App