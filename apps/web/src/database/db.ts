import Dexie, { type EntityTable } from 'dexie'

interface RollTable {
  id: number
  name: string
}

interface Entry {
  id: number
  tableId: number
  text: string
  weight?: number
}

const db = new Dexie('quill') as Dexie & {
  rollTables: EntityTable<RollTable, 'id'>
  entries: EntityTable<Entry, 'id'>
}

db.version(1).stores({
  rollTables: '++id, name',
  entries: '++id, tableId',
})

export { db }
export type { RollTable, Entry }
