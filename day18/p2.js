console.time('Day 18 part 2')
const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
// const input = [
//   '#############',
//   '#g#f.D#..h#l#',
//   '#F###e#E###.#',
//   '#dCba   BcIJ#',
//   '##### @ #####',
//   '#nK.L   G...#',
//   '#M###N#H###.#',
//   '#o#m..#i#jk.#',
//   '#############'
// ]

const A = 'A'.charCodeAt(0)
const a = 'a'.charCodeAt(0)

const key = ([x, y]) => `${x}_${y}`
const adj = ({ pos: [x, y], bot }) =>
  [
    [x, y - 1],
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
  ].map(pos => ({ pos, bot }))

let minSteps = Number.MAX_SAFE_INTEGER
let keyNum = 0
const visited = {}

const find = (poss, keys = 0, step = 0) => {
  if (step >= minSteps) {
    return
  }
  if (keys === keyNum) {
    minSteps = Math.min(minSteps, step)
    // no more new keys. all done
    return
  }
  const k = keys + ':' + poss.map(pos => pos.join(',')).join(':')
  if (visited[k] && visited[k] <= step) {
    return
  }
  visited[k] = step
  let wave = poss.map((pos, bot) => ({ pos, bot }))
  const newKeys = []
  const dist = {}

  const stepIfCan = ({ pos, bot }) => {
    const ch = input[pos[1]][pos[0]]
    if (ch === '#') return
    if (dist[key(pos)]) return
    if (ch >= 'A' && ch <= 'Z' && ((keys >>> (ch.charCodeAt(0) - A)) & 1) !== 1)
      return

    if (ch >= 'a' && ch <= 'z' && ((keys >>> (ch.charCodeAt(0) - a)) & 1) !== 1)
      newKeys.push({ pos, key: ch, step, bot })

    dist[key(pos)] = step
    return { pos, bot }
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

  newKeys.map(key => {
    const newPoss = [...poss]
    newPoss[key.bot] = key.pos
    find(newPoss, keys | (1 << (key.key.charCodeAt(0) - a)), key.step)
  })
}

const point = input.reduce(
  (pos, str, y) => (str.indexOf('@') < 0 ? pos : [str.indexOf('@'), y]),
  []
)

const update = (str, p, c) => str.substring(0, p) + c + str.substring(p + 1)

input[point[1]] = update(input[point[1]], point[0], '#')
input[point[1]] = update(input[point[1]], point[0] - 1, '#')
input[point[1]] = update(input[point[1]], point[0] + 1, '#')
input[point[1] - 1] = update(input[point[1] - 1], point[0], '#')
input[point[1] + 1] = update(input[point[1] + 1], point[0], '#')

const init = [
  [point[0] + 1, point[1] + 1],
  [point[0] - 1, point[1] - 1],
  [point[0] + 1, point[1] - 1],
  [point[0] - 1, point[1] + 1],
]

keyNum =
  Math.pow(
    2,
    input
      .map(s => s.replace(/[^a-z]/g, ''))
      .reduce((sum, s) => sum + s.length, 0)
  ) - 1
find(init)
console.log(minSteps)
console.timeEnd('Day 18 part 2')
