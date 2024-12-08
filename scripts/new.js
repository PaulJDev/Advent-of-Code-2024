import { join } from 'jsr:@std/path'

import { getDayInput } from './utils/getDayInput.js'
import { getDay } from './utils/getDay.js'
import {
  SRC,
  TESTS,
  INPUT,
  SOLUTION_FILENAME,
  README_FILENAME,
} from './constants.js'

const [day] = Deno.args

const dayParams = await getDay(day, SRC)
const create = createFiles(dayParams)

await Promise.all([
  create.srcFile(SRC),
  create.testFile(TESTS),
  create.inputFile(INPUT),
])

async function srcFile(src, { day, dayRaw }) {
  const nextDaySrcPath = join(src, day)
  await Deno.mkdir(nextDaySrcPath)

  const solutionPath = join(nextDaySrcPath, SOLUTION_FILENAME)
  const solutionContent = `export const solvePartOne = (input) => {
  return null;
}

export const solvePartTwo = (input) => {
  return null;
}

export const main = async () => {
  const input = await Deno.readTextFile('input/${newDay}.txt')
  console.log('Part one solution:', solvePartOne(input))
  console.log('Part two solution:', solvePartTwo(input))
}
`
  await Deno.writeTextFile(solutionPath, solutionContent)

  const readmePath = join(nextDaySrcPath, README_FILENAME)

  const response = await fetch(`https://adventofcode.com/2024/day/${newDayRaw}`)
  if (!response.ok) {
    await Deno.writeTextFile(readmePath, '')
    return
  }
  const text = await response.text()
  const [readmeContent] = text.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)
  const regex = /<\/article>([\s\S]*?)<\/main>/
  const cleanReadme = readmeContent.replace(regex, '</article></main>')
  const [_, title] = cleanReadme.match(/--- (.+) ---/)

  const projectReadmePath = join('.', README_FILENAME)
  const projectReadme = await Deno.readTextFile(projectReadmePath)

  const README_SEPARATOR = '\n## How to run'
  const [table, body] = projectReadme.split(README_SEPARATOR)
  const newRow =
    `| [${title}](https://adventofcode.com/2024/day/${dayRaw})       | \*\*  | [Link](./src/${day}/) |               |               |`

  await Deno.writeTextFile(readmePath, cleanReadme)
  const projectReadmeUpdated = table + newRow + '\n' + README_SEPARATOR + body
  await Deno.writeTextFile(projectReadmePath, projectReadmeUpdated)
}

async function testFile(tests, { day, dayRaw }) {
  const FILE_NAME = `${day}.test.js`

  const nextDayTestPath = join(tests, FILE_NAME)
  const testContent = `
import { solvePartOne, solvePartTwo } from '../src/${day}/index.js'
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
  await Deno.writeTextFile(nextDayTestPath, testContent)
}

async function inputFile(input, { day, dayRaw }) {
  const nextDayInputPath = join(input, `${day}.txt`)
  const inputContent = await getDayInput(dayRaw)
  await Deno.writeTextFile(nextDayInputPath, inputContent)
}

function createFiles(dayParams) {
  return {
    testFile: (tests) => testFile(tests, dayParams),
    srcFile: (src) => srcFile(src, dayParams),
    inputFile: (input) => inputFile(input, dayParams),
  }
}