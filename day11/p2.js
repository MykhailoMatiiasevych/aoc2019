const readToLines = require('../common/readToLines')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)
const { robot, key, unKey } = require('./robot')

const map = { [key(0, 0)]: 1 }
robot(program, map)

const coords = Object.keys(map)
  .map(unKey)
  .reduce((res, [x, y]) => ({ xs: [...res.xs, x], ys: [...res.ys, y] }), {
    xs: [],
    ys: [],
  })

const minX = Math.min(...coords.xs)
const minY = Math.min(...coords.ys)
const maxX = Math.max(...coords.xs)
const maxY = Math.max(...coords.ys)

for (let y = maxY; y >= minY; y--) {
  const v = []
  for (let x = minX; x <= maxX; x++) {
    v.push(map[key(x, y)] === 1 ? '█' : ' ')
  }
  console.log(v.join(''))
}
