import { getDay } from './utils/getDay.js'
import { SRC } from './constants.js'
import { aoc } from './utils/aoc.js'
import { createInput } from './utils/createInput.js'
import { createTest } from './utils/createTest.js'
import { createSrc } from './utils/createSrc.js'

const SESSION = Deno.env.get('AOC_SESSION')

const [day] = Deno.args

const dayParams = await getDay(day, SRC)
const aocClient = aoc(SESSION, dayParams.dayRaw)

await Promise.all([
  createSrc(aocClient, dayParams),
  createTest(dayParams),
  createInput(aocClient, dayParams),
])

