import { useRef } from 'react'
import { Beam, Load } from '../../types/staticAnalysis'
import { clearValidation } from '../../utils/form'

type LoadFormProps = {
  beam: Beam
  setBeam: React.Dispatch<React.SetStateAction<Beam>>
}

function LoadsForm({ beam, setBeam }: LoadFormProps) {
  const locationRef = useRef<HTMLInputElement | null>(null)
  const magnitudeRef = useRef<HTMLInputElement | null>(null)

  function loadExistsAtLocation(x: number) {
    return beam.loads.some((load) => load.x === x)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    const x = Number(formData.get('location'))
    const fx = Number(formData.get('fx')) ?? 0
    const fy = Number(formData.get('ft')) ?? 0
    const mz = Number(formData.get('mz')) ?? 0

    const noLoadsInputted = fx === 0 && fy === 0 && mz === 0
    if (noLoadsInputted) {
      magnitudeRef.current?.setCustomValidity('Must enter at least one load')
    }
    if (loadExistsAtLocation(x)) {
      locationRef.current?.setCustomValidity('Load already exists at location')
    }

    if (!magnitudeRef.current?.checkValidity() || !locationRef.current?.checkValidity()) {
      magnitudeRef.current?.reportValidity()
      locationRef.current?.reportValidity()
      return
    }

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
        <input
          required
          ref={locationRef}
          type="number"
          name="location"
          min={0}
          max={beam.length ?? ''}
          onChange={clearValidation}
        />
      </label>
      <fieldset>
        <legend>Magnitude and direction</legend>
        <label>
          <p>Fx</p>
          <input ref={magnitudeRef} type="number" name="fx" onChange={clearValidation} />
        </label>
        <label>
          <p>Fy</p>
          <input type="number" name="fy" onChange={clearValidation} />
        </label>
        <label>
          <p>Mz</p>
          <input type="number" name="mz" onChange={clearValidation} />
        </label>
      </fieldset>
      <button type="submit">Add load</button>
    </form>
  )
}

export default LoadsForm
