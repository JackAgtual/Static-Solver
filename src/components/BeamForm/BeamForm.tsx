import { BeamState, NewSupport } from '../../types/staticAnalysis'
import LengthForm from './LengthForm'
import SupportsForm from './SupportsForm'
import LoadsForm from './LoadsForm'

type BeamFormProps = BeamState & {
  solveBeam: () => void
  addSupport: (support: NewSupport) => void
}

function BeamForm({ beam, setBeam, addSupport, solveBeam }: BeamFormProps) {
  return (
    <>
      <h1>Beam information</h1>
      {beam.length === null ? (
        <LengthForm beam={beam} setBeam={setBeam} />
      ) : (
        <>
          <SupportsForm beam={beam} addSupport={addSupport} />
          <LoadsForm beam={beam} setBeam={setBeam} />
          <button type="button" onClick={solveBeam} disabled={beam.supports.length === 0}>
            Solve beam
          </button>
        </>
      )}
    </>
  )
}

export default BeamForm
