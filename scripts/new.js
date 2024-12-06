import * as path from 'jsr:@std/path'

const { join } = path
const projectDirectory = path.resolve('.')
const src = join(projectDirectory, 'src')
const tests = join(projectDirectory, 'tests')
const input = join(projectDirectory, 'input')

const [day] = Deno.args
const newDayRaw = day ?? (await getDay(src))
const newDay = `day_${newDayRaw.toString().padStart(2, '0')}`
console.log(`Creating new day: ${newDay}`)

const create = createFiles(newDay, newDayRaw)

await Promise.all([
  create.srcFile(src),
  create.testFile(tests),
  create.inputFile(input),
])

async function srcFile(src, day, dayRaw) {
  const FILE_NAME = 'index.js'
  const README = 'README.md'

  const nextDaySrcPath = join(src, day)
  await Deno.mkdir(nextDaySrcPath)

  const solutionPath = join(nextDaySrcPath, FILE_NAME)
  const solutionContent = `export const solvePartOne = (input) => {
  return input;
}

export const solvePartTwo = (input) => {
  return input;
}

export const main = async () => {
  const input = await Deno.readTextFile('input/${newDay}.txt')
  console.log('Part one solution:', solvePartOne(input))
  console.log('Part two solution:', solvePartTwo(input))
}
`
  await Deno.writeTextFile(solutionPath, solutionContent)

  const readmePath = join(nextDaySrcPath, README)

  const response = await fetch(`https://adventofcode.com/2024/day/${newDayRaw}`)
  if (!response.ok) {
    await Deno.writeTextFile(readmePath, '')
    return
  }
  const text = await response.text()
  const [readmeContent] = text.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)
  const regex = /<\/article>([\s\S]*?)<\/main>/;
  const cleanReadme = readmeContent.replace(regex, '</article></main>')
  const [_, title] = cleanReadme.match(/--- (.+) ---/)

  const projectReadmePath = join('.', README)
  const projectReadme = await Deno.readTextFile(projectReadmePath)

  const README_SEPARATOR = '\n## How to run'
  const [table, body] = projectReadme.split(README_SEPARATOR)
  const newRow = `| [${title}](https://adventofcode.com/2024/day/${dayRaw})       | \*\*  | [Link](./src/${day}/) |               |               |`


  await Deno.writeTextFile(readmePath, cleanReadme)
  const projectReadmeUpdated = table + newRow + '\n' + README_SEPARATOR + body
  await Deno.writeTextFile(projectReadmePath, projectReadmeUpdated)
}

async function testFile(tests, day, dayRaw) {
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

async function inputFile(input, day) {
  const nextDayInputPath = join(input, `${day}.txt`)
  await Deno.writeTextFile(nextDayInputPath, '')
}

function createFiles(day, dayRaw) {
  return {
    testFile: (tests) => testFile(tests, day, dayRaw),
    srcFile: (src) => srcFile(src, day, dayRaw),
    inputFile: (input) => inputFile(input, day),
  }
}

async function getDay(src) {
  const days = []
  for await (const { isDirectory, name } of Deno.readDir(src)) {
    if (!isDirectory) continue
    days.push(name)
  }

  const [lastDay] = days.at(-1).match(/\d+/)
  return +lastDay + 1
}
