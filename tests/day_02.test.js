import { solvePartOne, solvePartTwo } from '../src/day_02/index.js'
import { assertEquals } from 'jsr:@std/assert'

Deno.test({
  name: 'Day 2 - Part One',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_02.txt')
    const result = solvePartOne(input)
    const expected = 402
    assertEquals(result, expected)
  },
})

Deno.test({
  name: 'Day 2 - Part Two',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_02.txt')
    const result = solvePartTwo(input)
    const expected = 455
    assertEquals(result, expected)
  },
})
