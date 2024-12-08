import { join } from 'jsr:@std/path'

import { INPUT } from '../constants.js'

export const createInput = async (aoc, { day, dayRaw }) => {
  const nextDayInputPath = join(INPUT, `${day}.txt`)
  const inputContent = await aoc.getInput(dayRaw)
  await Deno.writeTextFile(nextDayInputPath, inputContent)
}
