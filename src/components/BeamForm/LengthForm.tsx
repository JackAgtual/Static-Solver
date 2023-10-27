import { Beam } from '../../types/staticAnalysis'

type LengthFormProps = {
  beam: Beam
  setBeam: React.Dispatch<React.SetStateAction<Beam>>
}

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
    <form onSubmit={handleSubmit}>
      <label>
        <p>Enter beam length</p>
        <input required type="number" name="length" min={1} />
      </label>
      <button type="submit">Set Length</button>
    </form>
  )
}

export default LengthForm
