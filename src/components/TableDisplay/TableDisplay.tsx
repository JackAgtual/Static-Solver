import { Beam, SolvedSupport } from '../../types/staticAnalysis'
import LoadsTable from './LoadsTable'
import SolvedSupportsTable from './SolvedSupports'
import SupportsTable from './SupportsTable'

type TableDisplayProps = {
  beam: Beam
  supportVals: null | SolvedSupport[]
  staticallyIndeterminate: boolean
}

function TableDisplay({ beam, supportVals, staticallyIndeterminate }: TableDisplayProps) {
  return (
    <>
      <h2>Supports</h2>
      <SupportsTable supports={beam.supports} />
      <h2>Loads</h2>
      <LoadsTable loads={beam.loads} />
      <SolvedSupportsTable
        staticallyIndeterminate={staticallyIndeterminate}
        supportVals={supportVals}
      />
    </>
  )
}

export default TableDisplay
