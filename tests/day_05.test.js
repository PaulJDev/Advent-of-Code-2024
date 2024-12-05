import { solvePartOne, solvePartTwo } from '../src/day_05/index.js'
import { assertEquals } from 'jsr:@std/assert'

Deno.test({
  name: 'Day 5 - Part One',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_05.txt')
    const result = solvePartOne(input)
    const expected = 4185
    assertEquals(result, expected)
  },
})

Deno.test({
  name: 'Day 5 - Part Two',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_05.txt')
    const result = solvePartTwo(input)
    const expected = 4480
    assertEquals(result, expected)
  },
})
