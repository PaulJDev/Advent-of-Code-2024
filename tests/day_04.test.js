import { solvePartOne, solvePartTwo } from '../src/day_04/index.js'
import { assertEquals } from 'jsr:@std/assert'

Deno.test({
  name: 'Day 4 - Part One',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_04.txt')
    const result = solvePartOne(input)
    const expected = 2524
    assertEquals(result, expected)
  },
})

Deno.test({
  name: 'Day 4 - Part Two',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_04.txt')
    const result = solvePartTwo(input)
    const expected = 1873
    assertEquals(result, expected)
  },
})
