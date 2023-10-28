import { Beam } from '../../types/staticAnalysis'
import LoadsTable from './LoadsTable'
import SupportsTable from './SupportsTable'

type TableDisplayProps = {
  beam: Beam
}

function TableDisplay({ beam }: TableDisplayProps) {
  return (
    <>
      <h2>Supports</h2>
      <SupportsTable supports={beam.supports} />
      <h2>Loads</h2>
      <LoadsTable loads={beam.loads} />
    </>
  )
}

export default TableDisplay
