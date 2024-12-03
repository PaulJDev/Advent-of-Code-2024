import { solvePartOne, solvePartTwo } from '../src/day_01/index.js'
import { assertEquals } from 'jsr:@std/assert'

Deno.test({
  name: 'Day 1 - Part One',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_01.txt')
    const result = solvePartOne(input)
    const expected = 2815556
    assertEquals(result, expected)
  },
})

Deno.test({
  name: 'Day 1 - Part Two',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_01.txt')
    const result = solvePartTwo(input)
    const expected = 23927637
    assertEquals(result, expected)
  },
})
