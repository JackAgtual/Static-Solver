import { useState } from 'react'
import Beam from '../services/beam/Beam'
import { Support } from '../types/staticAnalysis'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'

type AddSupportFormProps = {
  beam: Beam | undefined
  setSupports: React.Dispatch<React.SetStateAction<Support[]>>
}

function AddSupportForm({ beam, setSupports }: AddSupportFormProps) {
  const [x, setX] = useState<number | undefined>(undefined)
  const [rx, setRx] = useState(false)
  const [ry, setRy] = useState(false)
  const [rmz, setRmz] = useState(false)

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const xNum = Number(e.target.value)

    if (!xNum) return

    setX(xNum)
  }

  const handleCheckboxChange = (supportName: string) => {
    switch (supportName) {
      case 'Rx':
        setRx(!rx)
        break
      case 'Ry':
        setRy(!ry)
        break
      case 'RMz':
        setRmz(!rmz)
        break
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setRx(false)
    setRy(false)
    setRmz(false)

    if (!beam || x === undefined) return

    const updatedSupports = beam.addSupport({ x, rfx: rx, rfy: ry, rmz: rmz })
    setSupports(updatedSupports)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        onChange={handleLocationChange}
        required
        label="Support location"
        type="number"
      />
      <FormControlLabel
        control={<Checkbox checked={rx} onChange={() => handleCheckboxChange('Rx')} />}
        label="Rx"
      />
      <FormControlLabel
        control={<Checkbox checked={ry} onChange={() => handleCheckboxChange('Ry')} />}
        label="Ry"
      />
      <FormControlLabel
        control={<Checkbox checked={rmz} onChange={() => handleCheckboxChange('RMz')} />}
        label="RMz"
      />
      <Button type="submit">Add support</Button>
    </form>
  )
}

export default AddSupportForm
