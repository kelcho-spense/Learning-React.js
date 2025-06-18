
import ButtonExamples from './components/ButtonExamples'
import FlexBox from './components/flexbox/FlexBox'
import Grid from './components/grid/Grid'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Switch between components by commenting/uncommenting */}
      <ButtonExamples />
      <FlexBox />
      <Grid />
    </div>
  )
}

export default App
