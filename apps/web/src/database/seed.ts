import { db } from './db'

export async function seed() {
  const count = await db.rollTables.count()
  if (count > 0) return
  const tableId = await db.rollTables.add({ name: 'Figurants' })
  await db.entries.bulkAdd([
    { tableId, text: 'Un garde nerveux' },
    { tableId, text: 'Une mendiante borgne' },
  ])
}
