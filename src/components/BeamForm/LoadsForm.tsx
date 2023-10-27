import { Beam, Load } from '../../types/staticAnalysis'

type LoadFormProps = {
  beam: Beam
  setBeam: React.Dispatch<React.SetStateAction<Beam>>
}

function LoadsForm({ beam, setBeam }: LoadFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    const x = Number(formData.get('location'))
    const fx = Number(formData.get('fx')) ?? 0
    const fy = Number(formData.get('ft')) ?? 0
    const mz = Number(formData.get('mz')) ?? 0

    const load: Load = {
      id: beam.loads.length,
      x,
      fx,
      fy,
      mz,
    }

    setBeam({ ...beam, loads: [...beam.loads, load] })
    form.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p>Location</p>
        <input required type="number" name="location" min={0} max={beam.length ?? ''} />
      </label>
      <fieldset>
        <legend>Magnitude and direction</legend>
        <label>
          <p>Fx</p>
          <input type="number" name="fx" />
        </label>
        <label>
          <p>Fy</p>
          <input type="number" name="fy" />
        </label>
        <label>
          <p>Mz</p>
          <input type="number" name="mz" />
        </label>
      </fieldset>
      <button type="submit">Add load</button>
    </form>
  )
}

export default LoadsForm
