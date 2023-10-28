import { BeamState } from '../../types/staticAnalysis'
import LengthForm from './LengthForm'
import SupportsForm from './SupportsForm'
import LoadsForm from './LoadsForm'

type BeamFormProps = BeamState

function BeamForm({ beam, setBeam }: BeamFormProps) {
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
    </>
  )
}

export default BeamForm
