import { join } from 'jsr:@std/path'

import { TESTS } from '../constants.js'

export const createTest = async ({ day, dayRaw }) => {
  const FILE_NAME = `${day}.test.js`

  const testFilePath = join(TESTS, FILE_NAME)
  const testContent = renderTemplate({ day, dayRaw })
  await Deno.writeTextFile(testFilePath, testContent)
}

function renderTemplate({ day, dayRaw }) {
  return `import { solvePartOne, solvePartTwo } from '../src/${day}/index.js'
import { assertEquals } from 'jsr:@std/assert'

Deno.test({
name: 'Day ${dayRaw} - Part One',
permissions: { read: true },
fn: async () => {
    const input = await Deno.readTextFile('input/${day}.txt')
    const result = solvePartOne(input)
    const expected = false
    assertEquals(result, expected)
},
})

Deno.test({
name: 'Day ${dayRaw} - Part Two',
permissions: { read: true },
fn: async () => {
    const input = await Deno.readTextFile('input/${day}.txt')
    const result = solvePartTwo(input)
    const expected = false
    assertEquals(result, expected)
},
})
  `
}
