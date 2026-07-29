import { useLiveQuery } from 'dexie-react-hooks'
import { db } from './db'

export function DexiePlayground() {
  const tables = useLiveQuery(() => db.rollTables.toArray())
  const entries = useLiveQuery(() => db.entries.toArray())

  return (
    <div>
      <button onClick={() => db.rollTables.add({ name: 'Figurants' }).then(console.log)}>
        add
      </button>
      <button onClick={() => db.entries.where('tableId').equals(1).toArray().then(console.log)}>
        entries where tableId=1
      </button>
      <button
        onClick={() =>
          db.rollTables.delete(tables[tables?.length - 1].id).then(() => console.log('deleted'))
        }
      >
        delete
      </button>
      <pre>{JSON.stringify(tables, null, 2)}</pre>
      <pre>{JSON.stringify(entries, null, 2)}</pre>
    </div>
  )
}
