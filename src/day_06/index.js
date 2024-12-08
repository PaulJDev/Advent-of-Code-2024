export const solvePartOne = (input) => {
  const map = input
    .split('\n')
    .filter(Boolean)
    .map((row) => row.replace('\r', '').split(''))

  const guardianDirections = {
    '^': ({ x, y }) => ({ x, y: y - 1 }),
    'v': ({ x, y }) => ({ x, y: y + 1 }),
    '>': ({ x, y }) => ({ x: x + 1, y }),
    '<': ({ x, y }) => ({ x: x - 1, y }),
  }

  const rotateDirection = {
    '^': '>',
    '>': 'v',
    'v': '<',
    '<': '^',
  }

  const startPosition = map.reduce((acc, row, y) => {
    const x = row.findIndex((cell) => Object.keys(guardianDirections).includes(cell))
    return x !== -1 ? { x, y, direction: row[x] } : acc
  }, { x: -1, y: -1, direction: '' })

  const visited = new Set([`${startPosition.x},${startPosition.y}`])

  const explore = ({ x, y, direction }) => {
    const { x: nextX, y: nextY } = guardianDirections[direction]({ x, y })
    const nextCell = map[nextY]?.[nextX]

    return nextCell === undefined
      ? []
      : nextCell === '#'
      ? explore({ x, y, direction: rotateDirection[direction] })
      : explore({ x: nextX, y: nextY, direction }).concat(`${nextX},${nextY}`)
  }

  explore(startPosition).forEach((pos) => visited.add(pos))
  return visited.size
}

export const solvePartTwo = (input) => {
  const map = input.split('\n').filter(Boolean).map((row) => row.replace('\r', '').split(''))

  const directions = ['^', '>', 'v', '<']
  const guardian = {
    '^': ({ x, y }) => ({ x, y: y - 1 }),
    'v': ({ x, y }) => ({ x, y: y + 1 }),
    '>': ({ x, y }) => ({ x: x + 1, y }),
    '<': ({ x, y }) => ({ x: x - 1, y }),
  }

  const rotate = {
    '^': '>',
    '>': 'v',
    'v': '<',
    '<': '^',
  }

  let startX, startY, startDirection
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (directions.includes(map[y][x])) {
        startX = x
        startY = y
        startDirection = map[y][x]
        break
      }
    }
    if (startX !== undefined) break
  }

  const simulate = (map, startX, startY, startDirection) => {
    const visited = new Set()
    let x = startX, y = startY, direction = startDirection

    while (true) {
      const state = `${x},${y},${direction}`
      if (visited.has(state)) {
        return true
      }
      visited.add(state)

      const { x: nextX, y: nextY } = guardian[direction]({ x, y })

      if (
        nextY < 0 || nextY >= map.length ||
        nextX < 0 || nextX >= map[0].length ||
        map[nextY][nextX] === '#'
      ) {
        direction = rotate[direction]
      } else {
        x = nextX
        y = nextY
      }

      if (nextY < 0 || nextY >= map.length || nextX < 0 || nextX >= map[0].length) {
        return false
      }
    }
  }

  let validPositions = 0

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '.') {
        map[y][x] = '#'
        if (simulate(map, startX, startY, startDirection)) {
          validPositions++
        }

        map[y][x] = '.'
      }
    }
  }

  return validPositions
}

export const main = async () => {
  const input = await Deno.readTextFile('input/day_06.txt')
  console.log('Part one solution:', solvePartOne(input))
  console.log('Part two solution:', solvePartTwo(input))
}
