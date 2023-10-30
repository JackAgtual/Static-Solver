import { Load } from '../../types/staticAnalysis'

type LoadsTableProps = {
  loads: Load[]
}

function LoadsTable({ loads }: LoadsTableProps) {
  if (loads.length === 0) {
    return <div>You haven't added any loads</div>
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
        {loads.map((load) => {
          return (
            <tr key={load.id}>
              <td>{load.id}</td>
              <td>{load.x}</td>
              <td>{load.fx}</td>
              <td>{load.fy}</td>
              <td>{load.mz}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default LoadsTable
