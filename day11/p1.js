const readToLines = require('../common/readToLines')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

const map = {}
require('./robot').robot(program, map)

console.log(Object.keys(map).length)
