import { Load } from '../../types/staticAnalysis'
import style from './Table.module.css'
import { BsFillTrashFill } from 'react-icons/bs'

type LoadsTableProps = {
  loads: Load[]
  removeLoad: (idToRemove: number) => void
}

function LoadsTable({ loads, removeLoad }: LoadsTableProps) {
  if (loads.length === 0) {
    return <div>You haven't added any loads</div>
  }

  return (
    <table className={style.table}>
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
              <td>
                <div className={style.info}>
                  <p>{load.id}</p>
                  <div>
                    <button onClick={() => removeLoad(load.id)}>
                      <BsFillTrashFill />
                    </button>
                  </div>
                </div>
              </td>
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
