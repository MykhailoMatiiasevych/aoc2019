const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

const key = (x, y) => `${x}_${y}`
const unKey = k => k.split('_').map(Number)

const map = {}
let out = []
program[0] = 2
const arcade = intcode(program, [], o => out.push(o))

const getChar = v => {
  switch (v) {
    case 0:
      return ' '
    case 1:
      return '|'
    case 2:
      return '█'
    case 3:
      return '='
    case 4:
      return '0'
  }
}

const print = () => {
  const coords = Object.keys(map)
    .map(unKey)
    .reduce((res, [x, y]) => ({ xs: [...res.xs, x], ys: [...res.ys, y] }), {
      xs: [],
      ys: [],
    })

  const minX = 0
  const minY = 0
  const maxX = Math.max(...coords.xs)
  const maxY = Math.max(...coords.ys)

  for (let y = minY; y <= maxY; y++) {
    let line = ''
    for (let x = minX; x <= maxX; x++) {
      const block = map[key(x, y)]
      line += getChar(block)
    }
    console.log(line)
  }
  console.log(map[key(-1, 0)])
}

while (arcade.status !== intcode.STATUS.HALT) {
  for (let i = 0; i < out.length / 3; i++) {
    map[key(out[i * 3], out[i * 3 + 1])] = out[i * 3 + 2]
  }
  out = []

  if (arcade.status === intcode.STATUS.WAIT) {
    const ballX = unKey(Object.keys(map).find(k => map[k] === 4))[0]
    const paddleX = unKey(Object.keys(map).find(k => map[k] === 3))[0]

    const command = ballX === paddleX ? 0 : ballX > paddleX ? 1 : -1
    arcade.inputs = [command]
    arcade.continue()
  }
}
// process last output
for (let i = 0; i < out.length / 3; i++) {
  map[key(out[i * 3], out[i * 3 + 1])] = out[i * 3 + 2]
}
console.log(map[key(-1, 0)])
