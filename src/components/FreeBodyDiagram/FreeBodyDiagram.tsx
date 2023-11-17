import { Beam } from '../../types/staticAnalysis'
import Arrow from './Arrow'

type FreeBodyDiagramProps = {
  beam: Beam
}

const viewWidth = 100
const viewHeight = 50

const beamHeight = 2
const beamWidth = 90

function FreeBodyDiagram({ beam }: FreeBodyDiagramProps) {
  if (beam.length === null) return

  const xOrigin = (viewWidth - beamWidth) / 2

  return (
    <svg
      style={{ border: '5px solid green' }}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      fill="black"
    >
      <rect
        fill="grey"
        width={beamWidth}
        height={beamHeight}
        x={xOrigin}
        y={(viewHeight - beamHeight) / 2}
      />
      {beam.supports.map((support) => {
        if (beam.length === null) return <></>

        const x = xOrigin + (support.x / beam.length) * beamWidth

        return <Arrow x={x} y={25} />
      })}
    </svg>
  )
}

export default FreeBodyDiagram
