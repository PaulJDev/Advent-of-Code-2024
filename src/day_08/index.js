export const solvePartOne = (input) => {
  const map = input.split('\r\n').filter(Boolean)

  const antennas = map.flatMap((row, y) =>
    [...row].map((char, x) => (char !== '.' ? { char, x, y } : null)).filter(Boolean)
  )

  const antinodes = antennas.flatMap((ant1, i) =>
    antennas.slice(i + 1).flatMap((ant2) => {
      if (ant1.char !== ant2.char) return []
      const dx = ant2.x - ant1.x
      const dy = ant2.y - ant1.y
      const mid = { x: ant1.x - dx, y: ant1.y - dy }
      const far = { x: ant2.x + dx, y: ant2.y + dy }
      const isValid = ({ x, y }) => x >= 0 && y >= 0 && y < map.length && x < map[0].length
      return [mid, far].filter(isValid).map(({ x, y }) => `${x},${y}`)
    })
  )

  return new Set(antinodes).size
}

export const solvePartTwo = (input) => {
  const map = input.split('\r\n').filter(Boolean)

  const antennas = map.flatMap((row, y) =>
    [...row].map((char, x) => (char !== '.' ? { char, x, y } : null)).filter(Boolean)
  )

  const antinodes = new Set()

  antennas.forEach((ant1, i) => {
    antennas.slice(i + 1).forEach((ant2) => {
      if (ant1.char !== ant2.char) return

      const dx = ant2.x - ant1.x
      const dy = ant2.y - ant1.y

      let nextX = ant2.x + dx
      let nextY = ant2.y + dy

      while (nextX >= 0 && nextY >= 0 && nextY < map.length && nextX < map[0].length) {
        antinodes.add(`${nextX},${nextY}`)
        nextX += dx
        nextY += dy
      }

      nextX = ant1.x - dx
      nextY = ant1.y - dy

      while (nextX >= 0 && nextY >= 0 && nextY < map.length && nextX < map[0].length) {
        antinodes.add(`${nextX},${nextY}`)
        nextX -= dx
        nextY -= dy
      }

      antinodes.add(`${ant1.x},${ant1.y}`)
      antinodes.add(`${ant2.x},${ant2.y}`)
    })
  })

  return antinodes.size
}

export const main = async () => {
  const input = await Deno.readTextFile('input/day_08.txt')
  console.log('Part one solution:', solvePartOne(input))
  console.log('Part two solution:', solvePartTwo(input))
}
