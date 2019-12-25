const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

console.time('Day 19 part 2-2')

const side = 100
let ny = 1000
let nx = 0

while (true) {
  let v
  intcode(program, [nx, ny], o => (v = o))

  if (v === 1) break

  nx += 100
}
console.log(nx)
let res
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

const m = {
  up: 0,
  down: 0,
  left: 0,
  right: 0,
  jump: 0,
}

do {
  const pos = getPos(nx, ny)
  if (!pos[0]) {
    //move down right
    nx++
    ny++
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
  res = nx * 10000 + ny
  break
} while (true)

console.timeEnd('Day 19 part 2-2')
console.log(res)
