import { useState } from 'react'
import { Load, Support } from '../../types/staticAnalysis'

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
    <>
      <form onSubmit={handleSubmit}>
        <h1>Beam Length</h1>
        <label>
          <p>Enter beam length</p>
          <input required type="number" name="length" min={1} />
        </label>
        <button type="submit">
          {beam.length === null ? 'Set length' : 'Update length'}
        </button>
      </form>
    </>
  )
}

export default BeamForm
