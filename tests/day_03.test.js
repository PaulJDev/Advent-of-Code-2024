import { solvePartOne, solvePartTwo } from '../src/day_03/index.js'
import { assertEquals } from 'jsr:@std/assert'

Deno.test({
  name: 'Day 3 - Part One',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_03.txt')
    const result = solvePartOne(input)
    const expected = 171183089
    assertEquals(result, expected)
  },
})

Deno.test({
  name: 'Day 3 - Part Two',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_03.txt')
    const result = solvePartTwo(input)
    const expected = 63866497
    assertEquals(result, expected)
  },
})
