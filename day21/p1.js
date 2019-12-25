const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

const outArr = []
const out = outArr.push.bind(outArr)

const print = () => {
  let line = ''
  outArr.forEach(o => {
    if (o === 10) {
      console.log(line)
      line = ''
    } else if (o > 255) {
      line += o
    } else {
      line += String.fromCharCode(o)
    }
  })
  if (line) {
    console.log(line)
  }
}

const encode = str => str.split('').map(s => s.charCodeAt(0))

// (!C && D) || !A

let p = ''

p += 'NOT C J\n'
p += 'AND D J\n'
p += 'NOT A T\n'
p += 'OR T J\n'
p += 'WALK\n'

intcode(program, encode(p), out)
console.log(outArr[outArr.length - 1])
