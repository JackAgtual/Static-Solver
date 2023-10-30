import { SolvedSupport } from '../../types/staticAnalysis'

type SolvedSupportsTableProps = {
  supportVals: null | SolvedSupport[]
  staticallyIndeterminate: boolean
}

function SolvedSupports({
  supportVals,
  staticallyIndeterminate,
}: SolvedSupportsTableProps) {
  return (
    <>
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

export default SolvedSupports
