
const input = await Deno.readTextFile("src/day_01/input.txt");

const [listOne, listTwo] = input
    .replace(/\r/g, '')
    .split("\n")
    .reduce(([listOne, listTwo], curr) => {
        const [n1, n2] = curr.split("   ").map(Number)
        return [
            [...listOne, n1],
            [...listTwo, n2]
        ]
    }, [[], []])

const solution = listOne.reduce((acc, id) => acc + (id * (listTwo.filter(listId => id === listId).length)), 0)

console.log(solution)