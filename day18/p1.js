console.time('Day 18 part 1')
const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
// const input = [
// '#################',
// '#i.G..c...e..H.p#',
// '########.########',
// '#j.A..b...f..D.o#',
// '########@########',
// '#k.E..a...g..B.n#',
// '########.########',
// '#l.F..d...h..C.m#',
// '#################',
// ]

const A = 'A'.charCodeAt(0)
const a = 'a'.charCodeAt(0)

const key = ([x, y]) => `${x}_${y}`
const adj = ([x, y]) => [
  [x, y - 1],
  [x + 1, y],
  [x, y + 1],
  [x - 1, y],
]

let minSteps = Number.MAX_SAFE_INTEGER
let keyNum = 0
const visited = {}

const find = (pos, keys = 0, step = 0) => {
  if (step >= minSteps) {
    return
  }
  if (keys === keyNum) {
    minSteps = Math.min(minSteps, step)
    // no more new keys. all done
    return
  }
  const k = keys + ':' + pos.join(',')
  if (visited[k] && visited[k] <= step) {
    return
  }
  visited[k] = step
  let wave = [pos]
  const newKeys = []
  const dist = {}

  const stepIfCan = pos => {
    const ch = input[pos[1]][pos[0]]
    if (ch === '#') return
    if (dist[key(pos)]) return
    if (ch >= 'A' && ch <= 'Z' && ((keys >>> (ch.charCodeAt(0) - A)) & 1) !== 1)
      return

    if (ch >= 'a' && ch <= 'z' && ((keys >>> (ch.charCodeAt(0) - a)) & 1) !== 1)
      newKeys.push({ pos, key: ch, step })

    dist[key(pos)] = step
    return pos
  }

  while (wave.length) {
    step++
    if (step >= minSteps) {
      break
    }
    const newWave = []
    wave.forEach(w => newWave.push(...adj(w).map(stepIfCan)))

    wave = newWave.filter(Boolean)
  }
  newKeys.map(key =>
    find(key.pos, keys | (1 << (key.key.charCodeAt(0) - a)), key.step)
  )
}

const init = input.reduce(
  (pos, str, y) => (str.indexOf('@') < 0 ? pos : [str.indexOf('@'), y]),
  []
)

keyNum =
  Math.pow(
    2,
    input
      .map(s => s.replace(/[^a-z]/g, ''))
      .reduce((sum, s) => sum + s.length, 0)
  ) - 1
find(init)
console.log(minSteps)

console.timeEnd('Day 18 part 1')
