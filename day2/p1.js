const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')
const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

program[1] = 12
program[2] = 2
const { memory } = intcode(program)

console.log(memory[0])
