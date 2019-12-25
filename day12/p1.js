const readToLines = require('../common/readToLines')
const Universe = require('./universe')

const input = readToLines('./input.txt')

const universe = new Universe(
  input.map(moon =>
    moon
      .replace(/[<>\sxyz=]/g, '')
      .split(',')
      .map(Number)
  )
)

for (let s = 0; s < 1000; s++) {
  universe.step()
}

const sumAbs = arr => arr.map(a => a.reduce((sum, c) => sum + Math.abs(c), 0))

const pot = sumAbs(universe.moons)
const kin = sumAbs(universe.velocity)

const total = pot.reduce((res, p, i) => res + p * kin[i], 0)

console.log(total)
