import { useRef } from 'react'
import { Beam, NewLoad } from '../../../types/staticAnalysis'
import { clearValidation } from '../../../utils/form'
import style from './LoadsForm.module.css'

type LoadFormProps = {
  beam: Beam
  addLoad: (load: NewLoad) => void
}

function LoadsForm({ beam, addLoad }: LoadFormProps) {
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
    const fy = Number(formData.get('fy')) ?? 0
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

    const load: NewLoad = { x, fx, fy, mz }
    addLoad(load)
    form.reset()
  }

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <div className={style.location}>
        <label htmlFor="loadLocation">Location</label>
        <input
          required
          ref={locationRef}
          type="number"
          name="location"
          min={0}
          max={beam.length ?? ''}
          onChange={clearValidation}
          id="loadLocation"
        />
      </div>
      <fieldset>
        <legend>Magnitude and direction</legend>
        <div className={style.loadsInputWrapper}>
          <div className={style.inputWrapper}>
            <label htmlFor="fx">Force in x direction</label>
            <input
              ref={magnitudeRef}
              type="number"
              name="fx"
              onChange={clearValidation}
              id="fx"
            />
          </div>
          <div className={style.inputWrapper}>
            <label>Force in y direction</label>
            <input type="number" name="fy" onChange={clearValidation} id="fy" />
          </div>
          <div className={style.inputWrapper}>
            <label>Moment about z axis</label>
            <input type="number" name="mz" onChange={clearValidation} id="mz" />
          </div>
        </div>
      </fieldset>
      <button type="submit">Add load</button>
    </form>
  )
}

export default LoadsForm
