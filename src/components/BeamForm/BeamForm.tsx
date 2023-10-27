import { useState, useEffect } from 'react'
import { Load, Support, SupportDirection } from '../../types/staticAnalysis'

type Beam = {
  length: number | null
  supports: Support[]
  loads: Load[]
}

function BeamForm() {
  const [beam, setBeam] = useState<Beam>({
    length: null,
    supports: [],
    loads: [],
  })
  const [supportCnt, setSupportCnt] = useState(0)

  useEffect(() => {
    console.log(beam)
  }, [beam])

  function handleLengthSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const input = 'length'
    const length = Number(formData.get(input))
    if (length === null || length <= 0) {
      throw new Error('Invalid length')
    }
    setBeam({ ...beam, [input]: length })
  }

  function handleSupportSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    <>
      <h1>Beam information</h1>
      {beam.length === null ? (
        <form onSubmit={handleLengthSubmit}>
          <label>
            <p>Enter beam length</p>
            <input required type="number" name="length" min={1} />
          </label>
          <button type="submit">Set Length</button>
        </form>
      ) : (
        <form onSubmit={handleSupportSubmit}>
          <legend>Supports</legend>
          <label>
            <p>x location</p>
            <input required type="number" name="location" min={0} max={beam.length} />
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
      )}
    </>
  )
}

export default BeamForm
