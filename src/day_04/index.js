export const solvePartOne = (input) => {
  const [target, reversedTarget] = ['XMAS', 'SAMX']
  const grid = input.trim().split('\n').map((row) => row.split(''))
  const rows = grid.length
  const cols = grid[0].length

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ]

  const isWordInDirection = (row, col, dr, dc, word) => {
    return word.split('').every((char, i) => {
      const r = row + dr * i
      const c = col + dc * i
      return r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] === char
    })
  }

  const countWordOccurrences = (word) => {
    return grid.flatMap((_, row) =>
      grid[row].flatMap((_, col) => directions.filter(([dr, dc]) => isWordInDirection(row, col, dr, dc, word)))
    ).length
  }

  return countWordOccurrences(target) + countWordOccurrences(reversedTarget)
}

export const solvePartTwo = (input) => {
  const [mas, sam] = ['MAS', 'SAM']

  return input
    .split('\n')
    .map((row) => row.split(''))
    .reduce((acc, row, y, self) => {
      return acc + row.filter((char, x) => {
        if (char !== 'A') return false
        const upRight = self[y - 1]?.[x + 1]
        const upLeft = self[y - 1]?.[x - 1]

        const downRight = self[y + 1]?.[x + 1]
        const downLeft = self[y + 1]?.[x - 1]

        const word = upRight + char + downLeft
        const reversedWord = upLeft + char + downRight
        return (word === mas || word === sam) && (reversedWord === mas || reversedWord === sam)
      }).length
    }, 0)
}

export const main = async () => {
  const input = await Deno.readTextFile('input/day_04.txt')
  console.log('Part one solution:', solvePartOne(input))
  console.log('Part two solution:', solvePartTwo(input))
}
