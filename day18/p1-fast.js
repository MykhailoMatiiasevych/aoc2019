console.time('Day 18 part 1-2')
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

// Idea:
// Convert to graph, compress long chains, cut dead ends
// That will allow making multiple steps in single iteration

const key = ([x, y]) => `${x}_${y}`
const adj = ([x, y]) => [
  [x, y - 1],
  [x + 1, y],
  [x, y + 1],
  [x - 1, y],
]

const isOk = ([x, y]) => input[y][x] !== '#'

const A = 'A'.charCodeAt(0)
const a = 'a'.charCodeAt(0)

const maze = {}
let enter

let id = 0
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (!isOk([x, y])) continue
    const ch = input[y][x]
    const p = {
      id,
      adj: adj([x, y])
        .filter(isOk)
        .map(key),
      key: ch >= 'a' && ch <= 'z' && ch.charCodeAt(0) - a + 1,
      door: ch >= 'A' && ch <= 'Z' && ch.charCodeAt(0) - A + 1,
      size: 1,
      ch,
    }
    if (ch === '@') enter = p
    maze[key([x, y])] = p
    id++
  }
}

// Convert to graph
let g = Object.values(maze).map(v => {
  v.adj = v.adj.map(k => maze[k])
  return v
})

// Reduce
const isDead = v => v.adj.length === 1 && v.ch === '.'
const isPassage = v => v.adj.length === 2 && v.ch === '.'
const toRemove = v => isPassage(v) || isDead(v)
const notMe = v => a => a !== v

let reduced

do {
  reduced = []
  g = g.reduce((res, v) => {
    if (reduced.includes(v)) return res

    if (isPassage(v)) {
      let acquire
      do {
        acquire = false
        v.adj = v.adj
          .map(a => {
            if (toRemove(a)) {
              acquire = true
              v.size += a.size
              reduced.push(a)
              const n = a.adj.filter(notMe(v))[0]
              if (n) {
                n.adj = n.adj.filter(notMe(a)).concat(v)
              }
              return n
            }
            return a
          })
          .filter(Boolean)
      } while (acquire)
    }

    if (isDead(v)) {
      reduced.push(v)
      v.adj[0].adj = v.adj[0].adj.filter(notMe(v))
      return res
    }
    return [...res, v]
  }, [])
  g = g.filter(i => !reduced.includes(i))
} while (reduced.length)

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
  const k = keys + ':' + pos.id
  if (visited[k] && visited[k] <= step) {
    return
  }
  visited[k] = step
  let wave = [[pos, step]]
  const newKeys = []
  const dist = {}

  const stepIfCan = s => pos => {
    const newStep = s + pos.size
    if (dist[pos.id] && dist[pos.id] <= newStep) return

    if (pos.door && ((keys >>> (pos.door - 1)) & 1) !== 1) return

    if (pos.key && ((keys >>> (pos.key - 1)) & 1) !== 1)
      newKeys.push({ pos, step: newStep })

    dist[pos.id] = newStep
    return [pos, newStep]
  }

  while (wave.length) {
    // step++
    // if (step >= minSteps) {
    //   break
    // }
    const newWave = []
    wave.forEach(([w, s]) => {
      newWave.push(...w.adj.map(stepIfCan(s)))
    })

    wave = newWave.filter(Boolean)
  }
  newKeys.map(key => find(key.pos, keys | (1 << (key.pos.key - 1)), key.step))
}

keyNum =
  Math.pow(
    2,
    g.reduce((s, w) => (w.key ? s + 1 : s), 0)
  ) - 1
find(enter)
console.log(minSteps)

console.timeEnd('Day 18 part 1-2')
