import { BeamState } from '../../types/staticAnalysis'
import LengthForm from './LengthForm'
import SupportsForm from './SupportsForm'
import LoadsForm from './LoadsForm'
import BeamAnalyzer from '../../services/beam-analyzer/BeamAnalyzer'

type BeamFormProps = BeamState

function BeamForm({ beam, setBeam }: BeamFormProps) {
  function solveBeam() {
    const { supports, loads } = beam
    const beamAnalyzer = new BeamAnalyzer({ supports, loads })
    const supportValues = beamAnalyzer.solveReactionForces()
    console.log(supportValues)
  }

  // TODO: Figure out import/dependency issue causing error in console

  return (
    <>
      <h1>Beam information</h1>
      {beam.length === null ? (
        <LengthForm beam={beam} setBeam={setBeam} />
      ) : (
        <>
          <SupportsForm beam={beam} setBeam={setBeam} />
          <LoadsForm beam={beam} setBeam={setBeam} />
        </>
      )}
      <button type="button" onClick={solveBeam}>
        Solve beam
      </button>
    </>
  )
}

export default BeamForm
