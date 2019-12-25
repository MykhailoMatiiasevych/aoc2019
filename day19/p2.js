const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

console.time('Day 19 part 2-1')

const side = 100
const y = 1000
let x1, x2
let x = 0

while (true) {
  let v
  intcode(program, [x, y], o => (v = o))

  if (v === 1) {
    x1 = !x1 ? x : x1
    x2 = x
  } else {
    if (x2) {
      break
    }
  }
  x++
}

// y = kx
const k1 = y / x1
const k2 = y / x2

// Beam angle
const a = Math.atan(Math.abs((k1 - k2) / (1 + k1 * k2)))
const b = Math.atan(k2)

const z = Math.PI - a - b - Math.PI / 4
const l = (Math.sqrt(2 * side * side) * Math.sin(z)) / Math.sin(a)

// rough estimation
let nx = Math.floor(l * Math.cos(b)) - side + 1
let ny = Math.floor(l * Math.sin(b))

// fine tuning
const getPos = () => {
  const out = []
  const o = out.push.bind(out)

  intcode(program, [nx, ny], o)
  intcode(program, [nx + side - 1, ny], o)
  intcode(program, [nx + side, ny], o)
  intcode(program, [nx, ny + side - 1], o)
  intcode(program, [nx, ny + side], o)

  return out
}

let res

do {
  const pos = getPos()
  if (!pos[0]) {
    throw Error(`Wrong position: [${nx},${ny}], ${pos}`)
  }
  if (!pos[1]) {
    // move left
    nx--
    continue
  }
  if (pos[2]) {
    // move right
    nx++
    continue
  }
  if (!pos[3]) {
    // move down
    ny++
    continue
  }
  if (pos[4]) {
    // move up
    ny--
    continue
  }
  const r = nx * 10000 + ny

  if (r === res) {
    break
  }
  // stress test one more time
  res = r
  nx -= 10
  ny -= 10
} while (true)

console.timeEnd('Day 19 part 2-1')
console.log(res)
