import * as path from "jsr:@std/path";

const { join, dirname } = path;
const projectDirectory = path.resolve('.');
const src = join(projectDirectory, 'src');
const tests = join(projectDirectory, 'tests');

const [day] = Deno.args;
const newDayRaw = day ?? (await getDay(src));
const newDay = `day_${newDayRaw.toString().padStart(2, '0')}`;
console.log(`Creating new day: ${newDay}`);

await createSrcFile(src, newDay, newDayRaw);
await createTestFile(tests, newDay, newDayRaw);

async function createSrcFile(src, day, dayRaw) {
    const FILE_NAME = 'index.js';
    const README = 'README.md';

    const nextDaySrcPath = join(src, day);
    await Deno.mkdir(nextDaySrcPath);

    const solutionPath = join(nextDaySrcPath, FILE_NAME);
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
    await Deno.writeTextFile(solutionPath, solutionContent);

    const readmePath = join(nextDaySrcPath, README);

    const response = await fetch(`https://adventofcode.com/2024/day/${newDayRaw}`)
    const text = await response.text();
    const [readmeContent] = text.match(/<main\b[^>]*>([\s\S]*?)<\/main>/);

    await Deno.writeTextFile(readmePath, readmeContent);
}

async function createTestFile(tests, day, dayRaw) {
    const FILE_NAME = `${day}.test.js`;

    const nextDayTestPath = join(tests, FILE_NAME);
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
    await Deno.writeTextFile(nextDayTestPath, testContent);
}

async function getDay(src) {
    const days = [];
    for await (const { isDirectory, name } of Deno.readDir(src)) {
        if (!isDirectory) continue;
        days.push(name);
    }

    const [lastDay] = days.at(-1).match(/\d+/);
    return +lastDay + 1;
}