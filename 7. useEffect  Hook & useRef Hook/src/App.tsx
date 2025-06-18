// import BasicUseEffect from './components/useEffect/BasicUseEffect'
// import DoubleUseEffects from './components/useEffect/DoubleUseEffects'
// import FetchingData from './components/useEffect/FetchingData'
import AccessingDOMElements from './components/useRef/AccessingDOMElements'
// import FileUpload from './components/useRef/FileUpload'
// import TrackingState from './components/useRef/TrackingState'
function App() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 gap-2'>

      <h3>useEffect</h3>
      {/* <BasicUseEffect /> */}
      {/* <FetchingData /> */}
      {/* <DoubleUseEffects /> */}



      <h3>useRef</h3>
      <AccessingDOMElements />
      {/* <TrackingState /> */}
      {/* <FileUpload /> */}

    </div>

  )
}

export default App