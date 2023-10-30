import { useState, useEffect } from 'react'
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
  const [staticallyIndeterminate, setStaticallyIndeterminate] = useState(false)

  useEffect(() => {
    setStaticallyIndeterminate(false)
  }, [beam.supports])

  return (
    <>
      <div>Static solver</div>
      <BeamForm
        beam={beam}
        setBeam={setBeam}
        setSupportVals={setSupportVals}
        setStaticallyIndeterminate={setStaticallyIndeterminate}
      />
      <TableDisplay
        beam={beam}
        supportVals={supportVals}
        staticallyIndeterminate={staticallyIndeterminate}
      />
    </>
  )
}

export default App
