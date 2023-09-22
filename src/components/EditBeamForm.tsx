import { useState, useEffect } from 'react'
import Beam from '../services/beam/Beam'
import { Support } from '../types/staticAnalysis'
import AddSupportForm from './AddSupportForm'
import { Typography } from '@mui/material'

type EditBeamFormProps = {
  beamLength: number
}

function EditBeamForm({ beamLength }: EditBeamFormProps) {
  const [beam, setBeam] = useState<Beam | undefined>(undefined)
  const [supports, setSupports] = useState<Support[]>([])
  //   const [loads, setLoads] = useState<Load[]>([])

  useEffect(() => {
    const newBeam = new Beam(beamLength)
    setBeam(newBeam)
  }, [beamLength])

  return (
    <>
      <Typography>Edit the supports and loads on your beam</Typography>
      <Typography>Supports</Typography>
      {supports.map((support) => {
        return (
          <div>
            {support.x} {support.id} {support.direction}
          </div>
        )
      })}
      <AddSupportForm beam={beam} setSupports={setSupports} />
    </>
  )
}

export default EditBeamForm
