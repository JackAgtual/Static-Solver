import { useState } from 'react'
import { Beam } from './types/staticAnalysis'
import BeamForm from './components/BeamForm'
import TableDisplay from './components/TableDisplay/TableDisplay'

function App() {
  const [beam, setBeam] = useState<Beam>({
    length: null,
    supports: [],
    loads: [],
  })

  return (
    <>
      <div>Static solver</div>
      <BeamForm beam={beam} setBeam={setBeam} />
      <TableDisplay beam={beam} />
    </>
  )
}

export default App
