const input = await Deno.readTextFile('input/day_03.txt')

const solvePartOne = (input) =>
  input.match(/mul(\(\d{1,3},\d{1,3}\))/g)
    .reduce((acc, curr) => {
      const [x, y] = curr.match(/\d{1,3}/g).map(Number)
      return acc + x * y
    }, 0)

const solvePartTwo = (input) =>
  input.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g)
    .reduce(([acc, toProcess], curr) => {
      if (curr === 'do()') {
        return [acc, true]
      } else if (curr === "don't()") {
        return [acc, false]
      } else {
        const [x, y] = curr.match(/\d{1,3}/g).map(Number)
        return [toProcess ? acc + x * y : acc, toProcess]
      }
    }, [0, true]).at(0)

export const main = async () => {
  const input = await Deno.readTextFile('input/day_03.txt')
  console.log('Part one solution:', solvePartOne(input)) //171183089
  console.log('Part two solution:', solvePartTwo(input)) //63866497
}
