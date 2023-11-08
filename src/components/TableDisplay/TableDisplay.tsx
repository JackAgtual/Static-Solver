import { Beam, SolvedSupport } from '../../types/staticAnalysis'
import LoadsTable from './LoadsTable'
import SolvedSupportsTable from './SolvedSupports'
import SupportsTable from './SupportsTable'

type TableDisplayProps = {
  beam: Beam
  supportVals: null | SolvedSupport[]
  staticallyIndeterminate: boolean
  removeSupport: (idToRemove: number) => void
}

function TableDisplay({
  beam,
  supportVals,
  staticallyIndeterminate,
  removeSupport,
}: TableDisplayProps) {
  if (beam.length === null) return

  return (
    <div>
      <h1>Beam details</h1>
      <h2>Supports</h2>
      <SupportsTable supports={beam.supports} removeSupport={removeSupport} />
      <h2>Loads</h2>
      <LoadsTable loads={beam.loads} />
      <SolvedSupportsTable
        staticallyIndeterminate={staticallyIndeterminate}
        supportVals={supportVals}
      />
    </div>
  )
}

export default TableDisplay
