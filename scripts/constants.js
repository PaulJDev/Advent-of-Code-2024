import { join, resolve } from 'jsr:@std/path'

const PROJECT_DIRECTORY = resolve('.')

const SRC_FOLDER = 'src'
const TESTS_FOLDER = 'tests'
const INPUT_FOLDER = 'input'

const SRC = join(PROJECT_DIRECTORY, SRC_FOLDER)
const TESTS = join(PROJECT_DIRECTORY, TESTS_FOLDER)
const INPUT = join(PROJECT_DIRECTORY, INPUT_FOLDER)

const README_FILENAME = 'README.md'
const SOLUTION_FILENAME = 'index.js'

export { INPUT, PROJECT_DIRECTORY, README_FILENAME, SOLUTION_FILENAME, SRC, TESTS }
