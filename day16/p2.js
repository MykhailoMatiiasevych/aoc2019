console.time('Day 16 part 2')
const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')[0]

const skip = Number(input.substring(0, 7))
const length = input.length * 10000 - skip
const repeat = Math.ceil(length / input.length)

const init = input.split('').map(Number)
init.length = repeat * input.length
for (let r = 0; r < repeat; r++) {
  init.copyWithin(input.length * (r + 1), 0, input.length)
}
const offset = init.length - length

for (let step = 0; step < 100; step++) {
  let sum = 0
  for (let i = init.length - 1; i >= offset; i--) {
    sum = (sum + init[i]) % 10
    init[i] = sum
  }
}

console.log(init.slice(offset, offset + 8).join(''))
console.timeEnd('Day 16 part 2')
