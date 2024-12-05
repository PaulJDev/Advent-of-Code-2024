export const solvePartOne = (input) => {
  const inputSplit = input.split('\n')
  const separatorIndex = inputSplit.findIndex((element) => !element)
  const rules = inputSplit.slice(0, separatorIndex).map((order) => order.split('|').map(Number))

  return inputSplit.slice(separatorIndex + 1)
    .reduce((acc, list) => {
      const pages = list.split(',').map(Number)
      const relevantRules = rules.filter(([x, y]) => pages.includes(x) && pages.includes(y))

      const isValid = relevantRules.every(([x, y]) => pages.indexOf(x) < pages.indexOf(y))
      if (!isValid) return acc

      return acc + pages[Math.floor(pages.length / 2)]
    }, 0)
}

export const solvePartTwo = (input) => {
  const inputSplit = input.split('\n')
  const separatorIndex = inputSplit.findIndex((element) => !element)
  const rules = inputSplit.slice(0, separatorIndex).map((order) => order.split('|').map(Number))

  const orderPages = (pages, rules) => {
    const isValid = rules.every(([x, y]) => pages.indexOf(x) < pages.indexOf(y))
    if (isValid) return pages

    const pagesOrdered = rules.reduce((acc, [x, y]) => {
      const xIndex = acc.indexOf(x)
      const yIndex = acc.indexOf(y)

      if (xIndex < yIndex) return acc

      const temp = acc[xIndex]
      acc[xIndex] = acc[yIndex]
      acc[yIndex] = temp

      return acc
    }, [...pages])
    return orderPages(pagesOrdered, rules)
  }
  return inputSplit.slice(separatorIndex + 1)
    .reduce((acc, list) => {
      const pages = list.split(',').map(Number)
      const relevantRules = rules.filter(([x, y]) => pages.includes(x) && pages.includes(y))

      const isValid = relevantRules.every(([x, y]) => pages.indexOf(x) < pages.indexOf(y))
      if (isValid) return acc

      const pagesOrdered = orderPages(pages, relevantRules)

      return acc + pagesOrdered[Math.floor(pagesOrdered.length / 2)]
    }, 0)
}

export const main = async () => {
  const input = await Deno.readTextFile('input/day_05.txt')
  console.log('Part one solution:', solvePartOne(input))
  console.log('Part two solution:', solvePartTwo(input))
}
