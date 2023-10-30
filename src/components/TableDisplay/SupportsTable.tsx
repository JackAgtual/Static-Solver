import { Support, SupportDirection } from '../../types/staticAnalysis'

type SupportsTableProps = {
  supports: Support[]
}

function SupportsTable({ supports }: SupportsTableProps) {
  const ids = new Set(supports.map((support) => support.id))
  const combinedSupports = Array.from(ids).map((id) => {
    const supportsWithId = supports.filter((support) => support.id == id)

    const curId = supportsWithId[0].id
    const curX = supportsWithId[0].x

    return supportsWithId.reduce(
      (acc, cur) => {
        switch (cur.direction) {
          case SupportDirection.Fx:
            return { ...acc, rfx: true }
          case SupportDirection.Fy:
            return { ...acc, rfy: true }
          case SupportDirection.Mz:
            return { ...acc, rmz: true }
        }
      },
      {
        id: curId,
        x: curX,
        rfx: false,
        rfy: false,
        rmz: false,
      },
    )
  })

  if (supports.length === 0) {
    return <div>You haven't added any supports</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Fx</th>
          <th>Fy</th>
          <th>Mz</th>
        </tr>
      </thead>
      <tbody>
        {combinedSupports.map((support) => {
          return (
            <tr key={support.id}>
              <td>{support.id}</td>
              <td>{support.x}</td>
              <td>{support.rfx ? '1' : '0'}</td>
              <td>{support.rfy ? '1' : '0'}</td>
              <td>{support.rmz ? '1' : '0'}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default SupportsTable
