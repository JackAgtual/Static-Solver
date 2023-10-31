import useBeam from './hooks/useBeam'
import Header from './components/Header'
import BeamForm from './components/BeamForm'
import TableDisplay from './components/TableDisplay/TableDisplay'

function App() {
  const {
    beam,
    setBeam,
    staticallyIndeterminate,
    supportVals,
    addSupport,
    addLoad,
    solveBeam,
  } = useBeam()

  return (
    <>
      <Header />
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
      />
    </>
  )
}

export default App
