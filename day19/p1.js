const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

let sum = 0
for (let x = 0; x < 50; x++) {
  for (let y = 0; y < 50; y++) {
    intcode(program, [x, y], o => (sum += o))
  }
}

console.log(sum)
