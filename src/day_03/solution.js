const input = await Deno.readTextFile("src/day_03/input.txt");

const solution = 
    input.match(/mul(\(\d{1,3},\d{1,3}\))/g)
    .reduce((acc, curr) => {
        const [x, y] = curr.match(/\d{1,3}/g).map(Number)
        return acc + x * y
    }, 0)

console.log(solution)