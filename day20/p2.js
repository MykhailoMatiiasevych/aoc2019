console.time('Day 20 part 2')
const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')

const top = 2
const left = 2
// important to not have extra spaces
const right = input[top].length - 3
const bottom = input.length - 3

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
      step: {},
      pos: [x, y],
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
exit.step[0] = Number.MAX_SAFE_INTEGER

Object.values(maze).forEach(w => {
  w.adj = w.adj.map(k => maze[k])
})

Object.values(gates)
  .filter(v => v.length === 2)
  .forEach(([p1, p2]) => {
    p1.adj = [...p1.adj, p2]
    p2.adj = [...p2.adj, p1]
  })

const adjWithLevel = (w, level) => {
  const real = adj(w.pos).map(key)
  return w.adj
    .map(nw => {
      if (real.includes(key(nw.pos))) return [nw, level]
      if (
        w.pos[0] === left ||
        w.pos[0] === right ||
        w.pos[1] === top ||
        w.pos[1] === bottom
      ) {
        return level > 0 && [nw, level - 1]
      } else {
        return [nw, level + 1]
      }
    })
    .filter(Boolean)
}

const find = (pos, step = 0) => {
  let wave = [pos]

  while (wave.length) {
    if (step >= exit.step[0]) {
      break
    }
    const newWave = []
    wave.forEach(([w, level]) => {
      w.step[level] = step
      newWave.push(
        ...adjWithLevel(w, level).filter(
          ([nw, nl]) => !nw.step[nl] || nw.step[nl] > step + 1
        )
      )
    })

    wave = newWave
    step++
  }
}

find([enter, 0])

console.log(exit.step[0])

console.timeEnd('Day 20 part 2')
