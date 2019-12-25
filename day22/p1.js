console.time('Day 22 Part 1')
const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')

const length = 10007
let pos = 2019

for (let i = 0; i < input.length; i++) {
  const cmd = input[i]

  if (cmd.startsWith('cut')) {
    const n = Number(cmd.split(' ')[1])
    if (n > 0) {
      if (n - 1 >= pos) {
        pos += length - n
      } else {
        pos -= n
      }
    } else {
      if (length + n <= pos) {
        pos -= length + n
      } else {
        pos -= n
      }
    }
  } else if (cmd.startsWith('deal into')) {
    pos = length - pos - 1
  } else {
    const v = Number(cmd.split(' ')[3])
    pos *= v
    const mv = length * Math.floor(pos / length)
    pos = mv ? pos % mv : pos
  }
}

console.log(pos)

console.timeEnd('Day 22 Part 1')
