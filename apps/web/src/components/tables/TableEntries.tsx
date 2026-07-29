import { useParams } from 'react-router'
import { db } from '../../database/db'
import { useLiveQuery } from 'dexie-react-hooks'

export default function TableEntries() {
  const { id } = useParams()
  const tableId = Number(id)
  const entries = useLiveQuery(() => db.entries.where('tableId').equals(tableId).toArray())

  return (
    <>
      <ul>
        {entries?.map((item, index) => (
          <li>
            {index + 1} - {item.text}
          </li>
        ))}
      </ul>
    </>
  )
}
