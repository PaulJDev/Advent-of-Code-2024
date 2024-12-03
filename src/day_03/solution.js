const fs = require('fs')

// const input = await Deno.readTextFile("src/day_03/input.txt");
const input = fs.readFileSync("src/day_03/input.txt", "utf-8");

const solutionPartOne = 
    input.match(/mul(\(\d{1,3},\d{1,3}\))/g)
    .reduce((acc, curr) => {
        const [x, y] = curr.match(/\d{1,3}/g).map(Number)
        return acc + x * y
    }, 0)

console.log(solutionPartOne) //171183089

const [solutionPartTwo] = 
    input.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g)
    .reduce(([acc, toProcess], curr) => {
        if (curr === "do()") {
            return [acc, true]
        } else if (curr === "don't()") {
            return [acc, false]
        } else {
            const [x, y] = curr.match(/\d{1,3}/g).map(Number)
            return [toProcess ? acc + x * y : acc, toProcess]
        }
    }, [0, true])

console.log(solutionPartTwo) //63866497