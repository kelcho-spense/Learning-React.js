import PropDrillingExample from './PropDrillingExample'
import UseContextExample from './useContextExample'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Prop Drilling vs useContext Example</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Prop Drilling</h2>
          <PropDrillingExample />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">useContext</h2>
          <UseContextExample />
        </div>
      </div>
    </div>
  )
}

export default App