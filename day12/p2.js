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

const inits = []
const cycles = []
let found = 0
let step = 0

while (found < 3) {
  for (let i = 0; i < 3; i++) {
    if (cycles[i]) continue

    const position =
      universe.moons.map(moon => moon[i]).join(':') +
      ':' +
      universe.velocity.map(vel => vel[i]).join(':')

    if (inits[i] === position) {
      found++
      cycles[i] = step
    }
    if (!inits[i]) {
      inits[i] = position
    }
  }
  universe.step()
  step++
}

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))

const lcm = args => {
  if (args.length === 2) {
    return (args[0] * args[1]) / gcd(args[0], args[1])
  } else {
    return args.reduce((res, v) => lcm([res, v]))
  }
}

console.log(lcm(cycles))
