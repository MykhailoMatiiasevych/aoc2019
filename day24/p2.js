console.time('Day 24 part 2')

const readToLines = require('../common/readToLines')

const input = readToLines('./input.txt')
// const input = [
//   '....#',
//   '#..#.',
//   '#..##',
//   '..#..',
//   '#....']

const steps = 200

const print = m => {
  console.log(m.slice(0, 5))
  if (m.length > 5) print(m.slice(5))
}
const map = input
  .join('')
  .split('')
  .map(v => (v === '.' ? 0 : 1))
let zero = 0
let levels = [map]

const empty = () => Array(25).fill(0)
const numBug = a => a.filter(v => v === 1).length
const LEFT = Symbol()
const RIGHT = Symbol()
const UP = Symbol()
const DOWN = Symbol()

const getVals = level => (x, y, to) => {
  if (x < 0) {
    return [(levels[level + 1] || empty())[11]]
  }
  if (x > 4) {
    return [(levels[level + 1] || empty())[13]]
  }
  if (y < 0) {
    return [(levels[level + 1] || empty())[7]]
  }
  if (y > 4) {
    return [(levels[level + 1] || empty())[17]]
  }

  if (x === 2 && y === 2) {
    const inner = levels[level - 1] || empty()
    switch (to) {
      case LEFT:
        return [inner[4], inner[9], inner[14], inner[19], inner[24]]
      case RIGHT:
        return [inner[0], inner[5], inner[10], inner[15], inner[20]]
      case UP:
        return [inner[20], inner[21], inner[22], inner[23], inner[24]]
      case DOWN:
        return [inner[0], inner[1], inner[2], inner[3], inner[4]]
    }
  }
  return [(levels[level] || empty())[y * 5 + x]]
}

const getNewMap = level =>
  (levels[level] || empty()).map((ch, i) => {
    if (i === 12) return 0
    const x = i % 5
    const y = Math.floor(i / 5)
    const get = getVals(level)

    const adj = [
      ...get(x - 1, y, LEFT),
      ...get(x + 1, y, RIGHT),
      ...get(x, y - 1, UP),
      ...get(x, y + 1, DOWN),
    ]
    const l = numBug(adj)
    if (!ch) {
      return l === 1 || l === 2 ? 1 : 0
    } else {
      return l === 1 ? 1 : 0
    }
  })

for (step = 0; step < steps; step++) {
  const newTop = getNewMap(-1)
  const newBottom = getNewMap(levels.length)
  levels = levels.map((_, i) => getNewMap(i))

  if (numBug(newTop)) {
    levels.unshift(newTop)
    zero++
  }
  if (numBug(newBottom)) levels.push(newBottom)

  // levels.forEach((l,i) => {
  //   console.log('level', i-zero)
  //   print(l.map(v => v ? '#':'.').join(''))
  //   console.log()
  // })
}

const res = levels.reduce((s, l) => s + numBug(l), 0)
console.log(res)

console.timeEnd('Day 24 part 2')
