import { join } from 'jsr:@std/path'

import { README_FILENAME, SOLUTION_FILENAME, SRC } from '../constants.js'

export const createSrc = async (aoc, { day, dayRaw }) => {
    const nextDaySrcPath = join(SRC, day)
    const srcExists = await Deno.stat(nextDaySrcPath).catch(() => null)
    if (srcExists) {
        console.error(`Source files for day ${day} already exist`)
      return
    }

    await Deno.mkdir(nextDaySrcPath)
  
    const solutionPath = join(nextDaySrcPath, SOLUTION_FILENAME)
    const solutionContent = renderTemplate(day)
    await Deno.writeTextFile(solutionPath, solutionContent)
  
    const readmePath = join(nextDaySrcPath, README_FILENAME)
  
    const text = await aoc.getChallenge(dayRaw)
    const [readmeContent] = text.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)
    const [_, title] = readmeContent.match(/--- (.+) ---/)
    await Deno.writeTextFile(readmePath, text)
  
    const projectReadmePath = join('.', README_FILENAME)
    const projectReadme = await Deno.readTextFile(projectReadmePath)
  
    const README_SEPARATOR = '\n## How to run'
    const [table, body] = projectReadme.split(README_SEPARATOR)
    const newRow =
      `| [${title}](https://adventofcode.com/2024/day/${dayRaw})       | \*\*  | [Link](./src/${day}/) |               |               |`
  
    const projectReadmeUpdated = table + newRow + '\n' + README_SEPARATOR + body
    await Deno.writeTextFile(projectReadmePath, projectReadmeUpdated)
  }

function renderTemplate(day) {
    return `export const solvePartOne = (input) => {
return null;
}

export const solvePartTwo = (input) => {
return null;
}

export const main = async () => {
const input = await Deno.readTextFile('input/${day}.txt')
console.log('Part one solution:', solvePartOne(input))
console.log('Part two solution:', solvePartTwo(input))
}`
}