const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

const key = (x, y) => `${x}_${y}`

const out = []
intcode(program, [], o => out.push(o))

const map = {}
for (let i = 0; i < out.length / 3; i++) {
  map[key(out[i * 3], out[i * 3 + 1])] = out[i * 3 + 2]
}

const result = Object.values(map).filter(v => v === 2).length
console.log(result)
