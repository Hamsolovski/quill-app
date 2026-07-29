import { useLiveQuery } from 'dexie-react-hooks'
import { db } from './db'
import { seed } from './seed'

export function DexieDebug() {
  const tables = useLiveQuery(() => db.rollTables.toArray())
  const entries = useLiveQuery(() => db.entries.toArray())

  return (
    <>
      <button
        onClick={async () => {
          await seed()
          location.reload()
        }}
      >
        seed db
      </button>
      <button
        onClick={() => {
          db.delete()
          location.reload()
        }}
      >
        Reset db
      </button>
      <pre>{JSON.stringify(tables, null, 2)}</pre>
      <pre>{JSON.stringify(entries, null, 2)}</pre>
    </>
  )
}
