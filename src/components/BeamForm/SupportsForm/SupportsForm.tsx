import { useRef } from 'react'
import { Beam, NewSupport } from '../../../types/staticAnalysis'
import { clearValidation } from '../../../utils/form'
import style from './SupportsForm.module.css'

type SupportFormProps = {
  beam: Beam
  addSupport: (support: NewSupport) => void
}

function SupportsForm({ beam, addSupport }: SupportFormProps) {
  const directionRef = useRef<HTMLInputElement | null>(null)
  const locationRef = useRef<HTMLInputElement | null>(null)

  function supportExistsAtLocation(x: number) {
    return beam.supports.some((support) => support.x === x)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const x = Number(formData.get('location'))
    const rfx = !!formData.get('rfx')
    const rfy = !!formData.get('rfy')
    const rmz = !!formData.get('rmz')
    const noSupportSelected = !rfx && !rfy && !rmz

    if (supportExistsAtLocation(x)) {
      locationRef.current?.setCustomValidity('Support already exists at location')
    }
    if (noSupportSelected) {
      directionRef.current?.setCustomValidity('Must select at least one support')
    }

    if (!locationRef.current?.checkValidity() || !directionRef.current?.checkValidity()) {
      locationRef.current?.reportValidity()
      directionRef.current?.reportValidity()
      return
    }

    const supportToAdd: NewSupport = { x, rfx, rfy, rmz }
    addSupport(supportToAdd)
    form.reset()
  }

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <div className={style.location}>
        <label htmlFor="supportLocation">x location</label>
        <input
          ref={locationRef}
          required
          type="number"
          name="location"
          min={0}
          max={beam.length ?? ''}
          onChange={clearValidation}
          id="supportLocation"
        />
      </div>
      <fieldset>
        <legend>Support direction</legend>
        <div className={style.checkboxContainer}>
          <label className={style.label}>
            <input
              ref={directionRef}
              type="checkbox"
              name="rfx"
              onChange={clearValidation}
            />
            <p>Force x</p>
          </label>
          <label className={style.label}>
            <input type="checkbox" name="rfy" onChange={clearValidation} />
            <p>Force y</p>
          </label>
          <label className={style.label}>
            <input type="checkbox" name="rmz" onChange={clearValidation} />
            <p>Moment z</p>
          </label>
        </div>
      </fieldset>
      <button type="submit">Add support</button>
    </form>
  )
}

export default SupportsForm
