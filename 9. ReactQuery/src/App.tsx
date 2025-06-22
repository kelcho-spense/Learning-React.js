import { Suspense } from "react"
import PostList from "./components/PostList"
import Loaders from "./constants/Loaders"

function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<Loaders />}>
        {/* Suspense is used to handle the loading state of the PostList component */}
        <PostList />
      </Suspense>
    </div>
  )
}

export default App