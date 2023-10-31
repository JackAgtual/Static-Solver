import style from './LengthForm.module.css'
import { BeamState } from '../../../types/staticAnalysis'

type LengthFormProps = BeamState

function LengthForm({ beam, setBeam }: LengthFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const input = 'length'
    const length = Number(formData.get(input))
    if (length === null || length <= 0) {
      throw new Error('Invalid length')
    }
    setBeam({ ...beam, [input]: length })
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.label} htmlFor="lengthInput">
        Enter beam length
      </label>
      <input required type="number" name="length" id="lengthInput" min={1} />
      <button type="submit">Set Length</button>
    </form>
  )
}

export default LengthForm
