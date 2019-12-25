const readToLines = require('../common/readToLines')
const producer = require('./producer')

const input = readToLines('./input.txt')

const { produce, store, ORE, FUEL } = producer(input)

produce(FUEL, 1)
console.log(-store[ORE])
