import { useState, useRef } from 'react'
import { Beam, Support, SupportDirection } from '../../types/staticAnalysis'

type SupportFormProps = {
  beam: Beam
  setBeam: React.Dispatch<React.SetStateAction<Beam>>
}

function SupportsForm({ beam, setBeam }: SupportFormProps) {
  const [supportCnt, setSupportCnt] = useState(0)
  const directionRef = useRef<HTMLInputElement | null>(null)
  const locationRef = useRef<HTMLInputElement | null>(null)

  function handleLocationChange() {
    locationRef.current?.setCustomValidity('')
  }

  function handleDirectionChange() {
    directionRef.current?.setCustomValidity('')
  }

  function supportExistsAtLocation(x: number) {
    return beam.supports.some((support) => support.x === x)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const x = Number(formData.get('location'))
    const rx = !!formData.get('rx')
    const ry = !!formData.get('ry')
    const mz = !!formData.get('mz')
    const noSupportSelected = !rx && !ry && !mz

    if (supportExistsAtLocation(x)) {
      locationRef.current?.setCustomValidity('Support already exists at location')
    }
    if (noSupportSelected) {
      directionRef.current?.setCustomValidity('Must select at least one support')
    }

    locationRef.current?.reportValidity()
    directionRef.current?.reportValidity()

    if (!locationRef.current?.checkValidity() || !directionRef.current?.checkValidity()) {
      return
    }

    const supports: Support[] = []
    const id = supportCnt
    if (rx) {
      supports.push({ id, x, name: `R_Fx_${id}`, direction: SupportDirection.Fx })
    }
    if (ry) {
      supports.push({ id, x, name: `R_Fy_${id}`, direction: SupportDirection.Fy })
    }
    if (mz) {
      supports.push({ id, x, name: `R_Mz_${id}`, direction: SupportDirection.Mz })
    }

    setBeam({ ...beam, supports: [...beam.supports, ...supports] })
    setSupportCnt(supportCnt + 1)
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
          onChange={handleLocationChange}
        />
      </label>
      <fieldset>
        <legend>Support direction</legend>
        <label>
          <p>Force x</p>
          <input
            ref={directionRef}
            type="checkbox"
            name="rx"
            onChange={handleDirectionChange}
          />
        </label>
        <label>
          <p>Force y</p>
          <input type="checkbox" name="ry" onChange={handleDirectionChange} />
        </label>
        <label>
          <p>Moment z</p>
          <input type="checkbox" name="mz" onChange={handleDirectionChange} />
        </label>
      </fieldset>
      <button type="submit">Add support</button>
    </form>
  )
}

export default SupportsForm
