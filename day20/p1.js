console.time('Day 20 part 1')
const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')

// Idea:
// Convert to graph, compress long chains, cut dead ends

const key = ([x, y]) => `${x}_${y}`
const adj = ([x, y]) => [
  [x, y - 1],
  [x + 1, y],
  [x, y + 1],
  [x - 1, y],
]

const getCh = ([x, y]) => input[y][x]
const isGate = p => getCh(p) >= 'A' && getCh(p) <= 'Z'
const getGate = a => {
  if (isGate(a[0])) {
    // up
    return key([getCh(adj(a[0])[0]), getCh(a[0])])
  }
  if (isGate(a[1])) {
    // right
    return key([getCh(a[1]), getCh(adj(a[1])[1])])
  }
  if (isGate(a[2])) {
    // down
    return key([getCh(a[2]), getCh(adj(a[2])[2])])
  }
  if (isGate(a[3])) {
    // left
    return key([getCh(adj(a[3])[3]), getCh(a[3])])
  }
}

const isPath = ([x, y]) => input[y][x] === '.'

const maze = {}
const gates = {}

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (!isPath([x, y])) continue
    const a = adj([x, y])
    const p = {
      adj: a.filter(isPath).map(key),
      step: Number.MAX_SAFE_INTEGER,
      key: key([x, y]),
    }
    const gate = getGate(a)
    if (gate) {
      gates[gate] = gates[gate] || []
      gates[gate].push(p)
    }
    maze[key([x, y])] = p
  }
}

// connect gates
const enter = gates['A_A'][0]
const exit = gates['Z_Z'][0]

Object.values(maze).forEach(w => {
  w.adj = w.adj.map(k => maze[k])
})

Object.values(gates)
  .filter(v => v.length === 2)
  .forEach(([p1, p2]) => {
    p1.adj = [...p1.adj, p2]
    p2.adj = [...p2.adj, p1]
  })

const print = ws => ws.map(w => `${w.key} ${w.step}`).join(';')

const find = (pos, step = 0) => {
  let wave = [pos]

  while (wave.length) {
    if (step >= exit.step) {
      break
    }
    const newWave = []
    wave.forEach(w => {
      w.step = step
      newWave.push(...w.adj.filter(nw => nw.step > step + 1))
    })

    wave = newWave
    step++
  }
}

find(enter)

console.log(exit.step)

console.timeEnd('Day 20 part 1')
