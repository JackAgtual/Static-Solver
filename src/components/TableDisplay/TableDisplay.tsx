import { Beam, SolvedSupport } from '../../types/staticAnalysis'
import LoadsTable from './LoadsTable'
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
      {supportVals !== null && (
        <>
          <h2>Load values</h2>
          {staticallyIndeterminate ? (
            <div>Statically indeterminate</div>
          ) : (
            <div>
              {supportVals.map((support) => {
                return (
                  <div key={support.name}>
                    {support.name}: {support.value}
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default TableDisplay
