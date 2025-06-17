
import NormalForm from './components/NormalForm'
import TanstackForm from './components/TanstackForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          React Form Comparison: Normal vs Tanstack Form
        </h1>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">
              Normal React Form (useState)
            </h2>
            <NormalForm />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">
              Tanstack Form with Zod Validation
            </h2>
            <TanstackForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App