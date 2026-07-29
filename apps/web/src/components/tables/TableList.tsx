import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../../database/db'
import { Link } from 'react-router'

export default function TableList() {
  const tables = useLiveQuery(() => db.rollTables.toArray())

  return (
    <>
      <ul>
        {tables?.map((item, index) => (
          <Link to={`/tables/${item.id}`}>
            <li>
              {index + 1} - {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </>
  )
}
