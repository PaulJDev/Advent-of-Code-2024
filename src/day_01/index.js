export const solvePartOne = (input) => {
  const sortAsc = (arr) => arr.sort((a, b) => a - b)

  const [listOne, listTwo] = input
    .replace(/\r/g, '')
    .split('\n')
    .reduce(([listOne, listTwo], curr) => {
      const [n1, n2] = curr.split('   ').map(Number)
      return [
        sortAsc([...listOne, n1]),
        sortAsc([...listTwo, n2]),
      ]
    }, [[], []])

  return listOne.reduce(
    (acc, id, index) => acc + (Math.abs(id - listTwo[index])),
    0,
  )
}

export const solvePartTwo = (input) => {
  const [listOne, listTwo] = input
    .replace(/\r/g, '')
    .split('\n')
    .reduce(([listOne, listTwo], curr) => {
      const [n1, n2] = curr.split('   ').map(Number)
      return [
        [...listOne, n1],
        [...listTwo, n2],
      ]
    }, [[], []])

  return listOne.reduce(
    (acc, id) => acc + (id * (listTwo.filter((listId) => id === listId).length)),
    0,
  )
}

export const main = async () => {
  const input = await Deno.readTextFile('input/day_01.txt')
  console.log('Part one solution:', solvePartOne(input)) // 2815556
  console.log('Part two solution:', solvePartTwo(input)) // 23927637
}
