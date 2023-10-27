import { useState } from 'react'
import { Beam, Support, SupportDirection } from '../../types/staticAnalysis'

type SupportFormProps = {
  beam: Beam
  setBeam: React.Dispatch<React.SetStateAction<Beam>>
}

function SupportsForm({ beam, setBeam }: SupportFormProps) {
  const [supportCnt, setSupportCnt] = useState(0)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const x = Number(formData.get('location'))
    const rx = !!formData.get('rx')
    const ry = !!formData.get('ry')
    const mz = !!formData.get('mz')

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
  }

  return (
    <form onSubmit={handleSubmit}>
      <legend>Supports</legend>
      <label>
        <p>x location</p>
        <input required type="number" name="location" min={0} max={beam.length ?? ''} />
      </label>
      <label>
        <p>Force x</p>
        <input type="checkbox" name="rx" />
      </label>
      <label>
        <p>Force y</p>
        <input type="checkbox" name="ry" />
      </label>
      <label>
        <p>Moment z</p>
        <input type="checkbox" name="mz" />
      </label>
      <button type="submit">Add support</button>
    </form>
  )
}

export default SupportsForm
