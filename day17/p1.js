const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

const key = ([x, y]) => `${x}_${y}`
const unKey = k => k.split('_').map(Number)

const out = []
intcode(program, [], o => out.push(o))

let x = 0
let y = 0
const map = out.reduce((m, v) => {
  if (v === 10) {
    x = 0
    y++
    return m
  }
  m[key([x, y])] = String.fromCharCode(v)
  x++
  return m
}, {})

const coords = Object.keys(map)
  .map(unKey)
  .reduce((res, [x, y]) => ({ xs: [...res.xs, x], ys: [...res.ys, y] }), {
    xs: [],
    ys: [],
  })

const maxX = Math.max(...coords.xs)
const maxY = Math.max(...coords.ys)

let sum = 0
for (y = 0; y <= maxY; y++) {
  let line = ''
  for (x = 0; x <= maxX; x++) {
    line += map[key([x, y])]
    if (
      map[key([x, y])] === '#' &&
      map[key([x + 1, y])] === '#' &&
      map[key([x - 1, y])] === '#' &&
      map[key([x, y + 1])] === '#' &&
      map[key([x, y - 1])] === '#'
    ) {
      sum += x * y
    }
  }
  console.log(line)
}

console.log(sum)
