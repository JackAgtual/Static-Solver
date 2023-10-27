import { useState, useEffect } from 'react'
import { Beam } from '../../types/staticAnalysis'
import LengthForm from './LengthForm'
import SupportsForm from './SupportsForm'
import LoadsForm from './LoadsForm'

function BeamForm() {
  const [beam, setBeam] = useState<Beam>({
    length: null,
    supports: [],
    loads: [],
  })

  useEffect(() => {
    console.log(beam)
  }, [beam])

  return (
    <>
      <h1>Beam information</h1>
      {beam.length === null ? (
        <LengthForm beam={beam} setBeam={setBeam} />
      ) : (
        <>
          <SupportsForm beam={beam} setBeam={setBeam} />
          <LoadsForm beam={beam} setBeam={setBeam} />
        </>
      )}
    </>
  )
}

export default BeamForm
