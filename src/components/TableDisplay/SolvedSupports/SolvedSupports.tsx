import React from 'react'
import { SolvedSupport } from '../../../types/staticAnalysis'
import style from './SolvedSupports.module.css'

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
            <div className={style.gridWrapper}>
              {supportVals.map((support) => {
                return (
                  <React.Fragment key={support.name}>
                    <p>{support.name}:</p>
                    <p>{support.value}</p>
                  </React.Fragment>
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
