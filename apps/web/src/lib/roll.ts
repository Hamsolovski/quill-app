import type { Entry } from '../database/db'

function diceRoll(num: number) {
  return Math.floor(Math.random() * num)
}

function drawEntry(entries: Entry[], roll?: number): Entry {
  if (!entries || entries.length === 0) throw new Error('no table found')
  let total = 0
  const options = new Map()
  for (const entry of entries) {
    total += entry.weight ?? 1
    options.set(entry, total)
  }

  const draw = roll ?? diceRoll(total)

  for (const [entry, value] of options) {
    if (value > draw) return entry
  }
  throw new Error('impossible roll')
}

function rollFromTable(
  entries: Entry[],
  times: number,
  mode: 'multiples' | 'no-multiples' = 'no-multiples',
) {
  if (!entries || entries.length === 0) throw new Error('no table found')
  if (times > entries.length && mode === 'no-multiples') times = entries.length
  let copy = [...entries]
  const results = []
  for (let i = 0; i < times; i++) {
    const draw = drawEntry(copy)
    if (mode === 'no-multiples') copy = copy.filter((entry) => entry !== draw)
    results.push(draw)
  }
  return results
}

export { diceRoll, drawEntry, rollFromTable }

// en sans-remise, jamais deux fois la même entrée dans un même tirage
// toutes les entrées retournées appartiennent bien au pool d'origine
// une entrée à weight: 0 n'apparaît jamais
// une entrée sans weight vaut 1
// sur un grand nombre de tirages répétés, la fréquence d'apparition d'une entrée est à peu près proportionnelle à son poids
// Ce sont ces invariants-là que tu vérifieras dans le test unitaire de la Phase 4, pas des valeurs figées.
