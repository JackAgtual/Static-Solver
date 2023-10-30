import useBeam from './hooks/useBeam'
import BeamForm from './components/BeamForm'
import TableDisplay from './components/TableDisplay/TableDisplay'

function App() {
  const { beam, setBeam, staticallyIndeterminate, supportVals, solveBeam } = useBeam()

  return (
    <>
      <div>Static solver</div>
      <BeamForm beam={beam} setBeam={setBeam} solveBeam={solveBeam} />
      <TableDisplay
        beam={beam}
        supportVals={supportVals}
        staticallyIndeterminate={staticallyIndeterminate}
      />
    </>
  )
}

export default App
