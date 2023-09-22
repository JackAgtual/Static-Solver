import { Box, TextField, Container, Typography, Paper, Button } from '@mui/material'
import { useState } from 'react'

type CreateBeamFormProps = {
  setBeamLength: React.Dispatch<React.SetStateAction<number | undefined>>
}

function CreateBeamForm({ setBeamLength }: CreateBeamFormProps) {
  const [selectedBeamLength, setSelectedBeamLength] = useState<undefined | number>(
    undefined,
  )

  const handleBeamLengthChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const length = Number(e.target.value)

    if (!length || length <= 0) return

    setSelectedBeamLength(length)
  }

  const handleCreateBeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBeamLength(selectedBeamLength)
  }

  return (
    <Container>
      <Paper>
        <form onSubmit={handleCreateBeam}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component="h1" variant="h5">
              Enter a beam length to get started
            </Typography>
            <TextField
              onChange={handleBeamLengthChange}
              required
              label="Length"
              type="number"
            />
            <Button type="submit">Create beam</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default CreateBeamForm
