import { solvePartOne, solvePartTwo } from '../src/day_08/index.js'
import { assertEquals } from 'jsr:@std/assert'

Deno.test({
  name: 'Day 8 - Part One',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_08.txt')
    const result = solvePartOne(input)
    const expected = 398
    assertEquals(result, expected)
  },
})

Deno.test({
  name: 'Day 8 - Part Two',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_08.txt')
    const result = solvePartTwo(input)
    const expected = 1333
    assertEquals(result, expected)
  },
})
