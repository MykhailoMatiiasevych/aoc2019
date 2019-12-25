const readToLines = require('../common/readToLines')
const producer = require('./producer')

const input = readToLines('./input.txt')

const { produce, store, ORE, FUEL } = producer(input)

//dumb way
const orePerFuel = 1920219 // From part 1

store[ORE] = 1000000000000
let total = 0
let count = 1
while (count > 0) {
  count = Math.floor(store[ORE] / orePerFuel)
  produce(FUEL, count)
  total += count
}

// finalizing
while (store[ORE] > 0) {
  produce(FUEL, 1)
  store[ORE] > 0 && total++
}

console.log(total)
