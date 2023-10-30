import { useRef } from 'react'
import { Beam, NewSupport } from '../../types/staticAnalysis'
import { clearValidation } from '../../utils/form'

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
    <form onSubmit={handleSubmit}>
      <label>
        <p>x location</p>
        <input
          ref={locationRef}
          required
          type="number"
          name="location"
          min={0}
          max={beam.length ?? ''}
          onChange={clearValidation}
        />
      </label>
      <fieldset>
        <legend>Support direction</legend>
        <label>
          <p>Force x</p>
          <input
            ref={directionRef}
            type="checkbox"
            name="rfx"
            onChange={clearValidation}
          />
        </label>
        <label>
          <p>Force y</p>
          <input type="checkbox" name="rfy" onChange={clearValidation} />
        </label>
        <label>
          <p>Moment z</p>
          <input type="checkbox" name="rmz" onChange={clearValidation} />
        </label>
      </fieldset>
      <button type="submit">Add support</button>
    </form>
  )
}

export default SupportsForm
