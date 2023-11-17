import useBeam from './hooks/useBeam'
import Header from './components/Header'
import BeamForm from './components/BeamForm'
import TableDisplay from './components/TableDisplay/TableDisplay'
import FreeBodyDiagram from './components/FreeBodyDiagram'
import { Beam, SupportDirection } from './types/staticAnalysis'

const testBeam: Beam = {
  length: 10,
  supports: [
    // { id: 0, direction: SupportDirection.Fx, x: 0, name: 'R_Fx_0' },
    { id: 0, direction: SupportDirection.Fy, x: 0, name: 'R_Fy_0' },
    // { id: 0, direction: SupportDirection.Mz, x: 0, name: 'R_Mz_0' },
    { id: 1, direction: SupportDirection.Fy, x: 10, name: 'R_Fy_1' },
  ],
  loads: [{ x: 10, fx: 10, fy: -100, id: 0, mz: 100 }],
}

function App() {
  const {
    beam,
    setBeam,
    staticallyIndeterminate,
    supportVals,
    addSupport,
    addLoad,
    removeSupport,
    removeLoad,
    solveBeam,
  } = useBeam()

  return (
    <>
      <Header />
      <main>
        <BeamForm
          beam={beam}
          setBeam={setBeam}
          addSupport={addSupport}
          addLoad={addLoad}
          solveBeam={solveBeam}
        />
        <TableDisplay
          beam={beam}
          supportVals={supportVals}
          staticallyIndeterminate={staticallyIndeterminate}
          removeSupport={removeSupport}
          removeLoad={removeLoad}
        />
        <FreeBodyDiagram beam={testBeam} />
      </main>
    </>
  )
}

export default App
