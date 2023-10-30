import { useState } from 'react'
import { Beam, SolvedSupport } from './types/staticAnalysis'
import BeamForm from './components/BeamForm'
import TableDisplay from './components/TableDisplay/TableDisplay'

function App() {
  const [beam, setBeam] = useState<Beam>({
    length: null,
    supports: [],
    loads: [],
  })
  const [supportVals, setSupportVals] = useState<null | SolvedSupport[]>(null)

  return (
    <>
      <div>Static solver</div>
      <BeamForm beam={beam} setBeam={setBeam} setSupportVals={setSupportVals} />
      <TableDisplay beam={beam} supportVals={supportVals} />
    </>
  )
}

export default App
