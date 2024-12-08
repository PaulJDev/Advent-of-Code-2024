export const solvePartOne = (input) => {
  const lines = input.split(/\r?\n/).filter(Boolean)

  return lines.reduce((acc, line) => {
    const [total, numbersRaw] = line.split(':')
    const numbers = numbersRaw.trim().split(' ').map(Number)
    const target = Number(total)

    const combinations = Math.pow(2, numbers.length - 1)

    for (let i = 0; i < combinations; i++) {
      let result = numbers[0]

      for (let j = 0; j < numbers.length - 1; j++) {
        const operator = (i & (1 << j)) ? '*' : '+'
        const nextNumber = numbers[j + 1]

        result = operator === '*' ? result * nextNumber : result + nextNumber
      }

      if (Math.abs(result - target) < 1e-9) {
        return acc + target
      }
    }

    return acc
  }, 0)
}

export const solvePartTwo = (input) => {
  const lines = input.split(/\r?\n/).filter(Boolean)

  return lines.reduce((acc, line) => {
    const [total, numbersRaw] = line.split(':')
    const numbers = numbersRaw.trim().split(' ').map(Number)
    const target = Number(total)

    const combinations = Math.pow(3, numbers.length - 1)

    for (let i = 0; i < combinations; i++) {
      let result = numbers[0]
      let temp = i

      for (let j = 0; j < numbers.length - 1; j++) {
        const operatorType = temp % 3
        temp = Math.floor(temp / 3)
        const nextNumber = numbers[j + 1]

        if (operatorType === 0) {
          result += nextNumber
        } else if (operatorType === 1) {
          result *= nextNumber
        } else {
          result = parseInt(`${result}${nextNumber}`)
        }
      }

      if (Math.abs(result - target) < 1e-9) {
        return acc + target
      }
    }

    return acc
  }, 0)
}

export const main = async () => {
  const input = await Deno.readTextFile('input/day_07.txt')
  console.log('Part one solution:', solvePartOne(input))
  console.log('Part two solution:', solvePartTwo(input))
}
