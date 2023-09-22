import { useState } from 'react'
import Header from './components/Header'
import CreateBeamForm from './components/CreateBeamForm'
import EditBeamForm from './components/EditBeamForm'

function App() {
  const [beamLength, setBeamLength] = useState<number | undefined>(undefined)

  return (
    <>
      <Header />
      {beamLength ? (
        <EditBeamForm beamLength={beamLength} />
      ) : (
        <CreateBeamForm setBeamLength={setBeamLength} />
      )}
    </>
  )
}

export default App
