const readToLines = require('../common/readToLines')

const input = readToLines('./input.txt')
const fuel = input
  .map(Number)
  .map(n => n / 3)
  .map(Math.floor)
  .map(n => n - 2)
  .reduce((s, n) => s + n, 0)

console.log(fuel)
