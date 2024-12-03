
const input = await Deno.readTextFile("src/day_02/input.txt");

const isBetweenOneAndThree = (num = 2) => num >= 1 && num <= 3
const numbersAsc = (arr) => arr.every((num, i, arr) => !i || (num >= arr[i - 1] && isBetweenOneAndThree(num - arr[i - 1])))
const numbersDesc = (arr) => arr.every((num, i, arr) => !i || (num <= arr[i - 1] && isBetweenOneAndThree(arr[i - 1] - num)))
const isSafeWithOneRemoval = (arr) =>  arr.reduce((isSafe, _, i) => {
    if (isSafe) return true;
    const modifiedArray = [...arr.slice(0, i), ...arr.slice(i + 1)];
    return numbersAsc(modifiedArray) || numbersDesc(modifiedArray);
}, false);

const solutionPartOne = input.split("\n").reduce((acc, curr) => {
    const numbers = curr.split(" ").map(Number)

    const isSafe = numbersAsc(numbers) || numbersDesc(numbers)

    return isSafe ? acc + 1 : acc
}, 0)

const solutionPartTwo = input
    .split("\n")
    .reduce((acc, curr) => {
        const numbers = curr.split(" ").map(Number);
        const isSafe = numbersAsc(numbers) || numbersDesc(numbers) || isSafeWithOneRemoval(numbers);
        return isSafe ? acc + 1 : acc;
    }, 0);

console.log(solutionPartOne) //402
console.log(solutionPartTwo) //455