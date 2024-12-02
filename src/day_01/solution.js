
const input = await Deno.readTextFile("src/day_01/input.txt");

const sortAsc = (arr) => arr.sort((a, b) => a - b)
const [listOne, listTwo] = input
    .replace(/\r/g, '')
    .split("\n")
    .reduce(([listOne, listTwo], curr) => {
        const [n1, n2] = curr.split("   ").map(Number)
        return [
            sortAsc([...listOne, n1]),
            sortAsc([...listTwo, n2])
        ]
    }, [[], []])
    

const solution = listOne.reduce((acc, id, index) => acc + (Math.abs(id - listTwo[index])), 0)

console.log(solution)