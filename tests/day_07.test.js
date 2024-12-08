import { solvePartOne, solvePartTwo } from '../src/day_07/index.js'
import { assertEquals } from 'jsr:@std/assert'

Deno.test({
  name: 'Day 7 - Part One',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_07.txt')
    const result = solvePartOne(input)
    const expected = 1545311493300
    assertEquals(result, expected)
  },
})

Deno.test({
  name: 'Day 7 - Part Two',
  permissions: { read: true },
  fn: async () => {
    const input = await Deno.readTextFile('input/day_07.txt')
    const result = solvePartTwo(input)
    const expected = 169122112716571
    assertEquals(result, expected)
  },
})
