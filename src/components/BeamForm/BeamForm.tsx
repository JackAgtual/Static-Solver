import { BeamState, SolvedSupport } from '../../types/staticAnalysis'
import LengthForm from './LengthForm'
import SupportsForm from './SupportsForm'
import LoadsForm from './LoadsForm'
import BeamAnalyzer from '../../services/beam-analyzer/BeamAnalyzer'

type BeamFormProps = BeamState & {
  setSupportVals: React.Dispatch<React.SetStateAction<SolvedSupport[] | null>>
  setStaticallyIndeterminate: React.Dispatch<React.SetStateAction<boolean>>
}

function BeamForm({
  beam,
  setBeam,
  setSupportVals,
  setStaticallyIndeterminate,
}: BeamFormProps) {
  function solveBeam() {
    const { supports, loads } = beam

    const beamAnalyzer = new BeamAnalyzer({ supports, loads })
    try {
      const solvedSupportValues = beamAnalyzer.solveReactionForces()
      // assume beam.supports and solvedSupportValues are the same length
      setSupportVals(
        beam.supports.map((support, idx) => ({
          name: support.name,
          value: Number(solvedSupportValues[idx]),
        })),
      )
    } catch {
      setStaticallyIndeterminate(true)
    }
  }

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
