import { describe, it, expect } from 'vitest'
import { drawEntry, rollFromTable } from '../roll'
import type { Entry } from '../../database/db'

const sample = [
  { text: 'A', weight: 1 },
  { text: 'B', weight: 2 },
  { text: 'C', weight: 3 },
] as Entry[]
describe('drawEntry', () => {
  it('should throw an error given an empty table', () => {
    const emptyData: Entry[] = []
    expect(() => drawEntry(emptyData)).toThrow('no table found')
  })
  it('should throw an error given a greater roll than total weight', () => {
    const rolls = 8
    expect(() => drawEntry(sample, rolls)).toThrow('impossible roll')
  })
  it('should never draw an entry with weight = 0', () => {
    const weightlessEntry = { text: 'D', weight: 0 } as Entry
    const entries = [...sample, weightlessEntry]
    const results = []
    for (let i = 0; i < 100; i++) {
      results.push(drawEntry(entries))
    }
    expect(results).not.toContain(weightlessEntry)
  })

  it('should count an entry with no weight as weight 1', () => {
    const weightlessEntry = { text: 'E' } as Entry
    const entries = [...sample, weightlessEntry]
    const results = []
    for (let i = 0; i < 100; i++) {
      results.push(drawEntry(entries))
    }
    expect(results).toContain(weightlessEntry)
  })

  it('should draw randomly from equal weights', () => {
    const N = 1000
    const equalEntries = [
      { text: 'A', weight: 1 },
      { text: 'B', weight: 1 },
      { text: 'C', weight: 1 },
    ] as Entry[]
    const results = [] as Entry[]
    for (let i = 0; i < N; i++) {
      const result = drawEntry(equalEntries)
      results.push(result)
    }
    const countFor = (entry: Entry) => results.filter((r) => r === entry).length
    const expected = N / equalEntries.length

    // Marge d'erreur de 20% au-dessus & au-dessous pour tous les éléments
    expect(countFor(equalEntries[0])).toBeGreaterThan(expected * 0.8)
    expect(countFor(equalEntries[0])).toBeLessThan(expected * 1.2)
    expect(countFor(equalEntries[1])).toBeGreaterThan(expected * 0.8)
    expect(countFor(equalEntries[1])).toBeLessThan(expected * 1.2)
    expect(countFor(equalEntries[2])).toBeGreaterThan(expected * 0.8)
    expect(countFor(equalEntries[2])).toBeLessThan(expected * 1.2)
  })

  it('should ponder weights properly', () => {
    const N = 1000
    const results = [] as Entry[]
    for (let i = 0; i < N; i++) {
      const result = drawEntry(sample)
      results.push(result)
    }
    const countFor = (entry: Entry) => results.filter((r) => r === entry).length
    const totalWeight = sample[0].weight! + sample[1].weight! + sample[2].weight!
    const expectedA = (sample[0].weight! / totalWeight) * N
    const expectedB = (sample[1].weight! / totalWeight) * N
    const expectedC = (sample[2].weight! / totalWeight) * N

    // Marge d'erreur de 20% au-dessus & au-dessous pour tous les éléments
    expect(countFor(sample[0])).toBeGreaterThan(expectedA * 0.8)
    expect(countFor(sample[0])).toBeLessThan(expectedA * 1.2)
    expect(countFor(sample[1])).toBeGreaterThan(expectedB * 0.8)
    expect(countFor(sample[1])).toBeLessThan(expectedB * 1.2)
    expect(countFor(sample[2])).toBeGreaterThan(expectedC * 0.8)
    expect(countFor(sample[2])).toBeLessThan(expectedC * 1.2)
  })
})

describe('rollFromTable', () => {
  const defaultRoll = 1
  it('should throw an error given an empty table', () => {
    const emptyData: Entry[] = []
    expect(() => rollFromTable(emptyData, defaultRoll)).toThrow('no table found')
  })
  it('should set times to table.length when given a number greater than length', () => {
    const largerRoll = 4
    const results = rollFromTable(sample, largerRoll)
    expect(results.length).toBe(sample.length)
  })
  it('should not draw the same entry twice by default', () => {
    const N = 1000
    for (let i = 0; i < N; i++) {
      const result = rollFromTable(sample, 3)
      const set = new Set(result)
      expect(set.size).toBe(sample.length)
    }
  })
  it('should only return entries from given table', () => {
    const N = 1000
    for (let i = 0; i < N; i++) {
      const results = rollFromTable(sample, sample.length)
      expect(results.every((element) => sample.includes(element))).toBe(true)
    }
  })
  it('should not alter given table', () => {
    const before = [...sample]
    rollFromTable(sample, 3)
    expect(sample).toEqual(before)
  })
  it('should be able to draw the same entry multiple times if multiples allowed', () => {
    const result = rollFromTable(sample, 10, 'multiples')
    const set = new Set(result)
    expect(set.size).toBeLessThan(10)
  })
})
