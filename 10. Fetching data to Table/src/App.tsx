import { Suspense, useState } from "react"
import PostList from "./components/PostList"
import Loaders from "./constants/Loaders"
import PostTable from "./components/PostTable"

function App() {

  const [currentView, setCurrentView] = useState<'table' | 'list'>('table')

  return (
    // <div className="min-h-screen bg-gray-50">
    //   <Suspense fallback={<Loaders />}>
    //     {/* Suspense is used to handle the loading state of the PostList component */}
    //     <PostList />
    //   </Suspense>
    // </div>

     <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              onClick={() => setCurrentView('table')}
              className={`px-6 py-2 rounded-md transition-all ${currentView === 'table'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Table View
            </button>
            <button
              onClick={() => setCurrentView('list')}
              className={`px-6 py-2 rounded-md transition-all ${currentView === 'list'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Card View
            </button>
          </div>
        </div>

        <Suspense fallback={<Loaders />}>
          {currentView === 'table' ? <PostTable /> : <PostList />}
        </Suspense>
      </div>
    </div>
  )
}

export default App