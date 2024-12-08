import { solvePartOne, solvePartTwo } from '../src/day_06/index.js'
import { assertEquals } from 'jsr:@std/assert'

Deno.test({
  name: 'Day 6 - Part One',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_06.txt')
    const result = solvePartOne(input)
    const expected = 5030
    assertEquals(result, expected)
  },
})

Deno.test({
  name: 'Day 6 - Part Two',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_06.txt')
    const result = solvePartTwo(input)
    const expected = 1928
    assertEquals(result, expected)
  },
})
