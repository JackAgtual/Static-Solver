import { BeamState, NewLoad, NewSupport } from '../../types/staticAnalysis'
import LengthForm from './LengthForm'
import SupportsForm from './SupportsForm'
import LoadsForm from './LoadsForm'
import style from './BeamForm.module.css'

type BeamFormProps = BeamState & {
  solveBeam: () => void
  addSupport: (support: NewSupport) => void
  addLoad: (load: NewLoad) => void
}

function BeamForm({ beam, setBeam, addSupport, addLoad, solveBeam }: BeamFormProps) {
  return (
    <div>
      <h1>Beam information</h1>
      {beam.length === null ? (
        <LengthForm beam={beam} setBeam={setBeam} />
      ) : (
        <div className={style.formWrapper}>
          <div>
            <h2 className={style.formTitle}>Beam supports</h2>
            <SupportsForm beam={beam} addSupport={addSupport} />
          </div>
          <div>
            <h2 className={style.formTitle}>Beam loads</h2>
            <LoadsForm beam={beam} addLoad={addLoad} />
          </div>
          <button
            className={style.mainBtn}
            type="button"
            onClick={solveBeam}
            disabled={beam.supports.length === 0}
          >
            Solve beam
          </button>
        </div>
      )}
    </div>
  )
}

export default BeamForm
