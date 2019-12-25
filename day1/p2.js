const readToLines = require('../common/readToLines')

const input = readToLines('./input.txt')

const addFuel = m => {
  const fuel = Math.floor(m / 3) - 2
  if (fuel <= 0) return m
  return m + addFuel(fuel)
}

const fuelForModules = input
  .map(Number)
  .map(n => n / 3)
  .map(Math.floor)
  .map(n => n - 2)
  .map(addFuel)
  .reduce((s, n) => s + n, 0)

console.log(fuelForModules)
