const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

const key = ([x, y]) => `${x}_${y}`
const unKey = k => k.split('_').map(Number)

const out = []
intcode(program, [], o => out.push(o))

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
]
let pos
let dir

let x = 0
let y = 0
const map = out.reduce((m, v) => {
  if (v === 10) {
    x = 0
    y++
    return m
  }
  const char = String.fromCharCode(v)
  m[key([x, y])] = char

  if (char === '^') {
    pos = [x, y]
    dir = 0
  }
  if (char === '>') {
    pos = [x, y]
    dir = 1
  }
  if (char === 'v') {
    pos = [x, y]
    dir = 2
  }
  if (char === '<') {
    pos = [x, y]
    dir = 3
  }

  x++
  return m
}, {})

const nextPos = (pos, dir) => [
  pos[0] + directions[dir][0],
  pos[1] + directions[dir][1],
]
const isMoveOk = (pos, dir) => map[key(nextPos(pos, dir))] === '#'
const left = dir => (dir === 0 ? 3 : dir - 1)
const right = dir => (dir === 3 ? 0 : dir + 1)

const path = []

while (true) {
  if (isMoveOk(pos, dir)) {
    path.push(1)
    pos = nextPos(pos, dir)
    continue
  }
  if (isMoveOk(pos, left(dir))) {
    path.push('L')
    path.push(1)
    dir = left(dir)
    pos = nextPos(pos, dir)
    continue
  }
  if (isMoveOk(pos, right(dir))) {
    path.push('R')
    path.push(1)
    dir = right(dir)
    pos = nextPos(pos, dir)
    continue
  }
  break
}

const str = path
  .reduce((res, v) => {
    if (v === 'L' || v === 'R') {
      return res.concat(v)
    }
    if (!isNaN(res[res.length - 1])) {
      res[res.length - 1]++
      return res
    }
    return res.concat(1)
  }, [])
  .join('')

const find = () => {
  for (let a = 1; a < Math.min(str.length - 2, 20); a++) {
    const A = str.substring(0, a)
    const noA = str.replace(RegExp(A, 'g'), '')
    for (let b = 1; b < Math.min(noA.length - 1, 20); b++) {
      const B = noA.substring(0, b)
      const noB = noA.replace(RegExp(B, 'g'), '')
      for (let c = 1; c < Math.min(noB.length, 20); c++) {
        const C = noB.substring(0, c)
        const noC = noB.replace(RegExp(C, 'g'), '')
        if (noC.length === 0) {
          const command = str
            .replace(RegExp(A, 'g'), 'A')
            .replace(RegExp(B, 'g'), 'B')
            .replace(RegExp(C, 'g'), 'C')

          if (command.replace(/A|B|C/g, '').length !== 0) {
            continue
          }
          return { A, B, C, command }
        }
      }
    }
  }
}

const res = find()

const encode = str =>
  str
    .split('')
    .map((v, i, a) => {
      if (!isNaN(v) && !isNaN(a[i + 1]))
        return Number(v) * 10 + Number(a[i + 1])
      if (!isNaN(v) && !isNaN(a[i - 1])) return false
      return v
    })
    .filter(Boolean)
    .join(',')
    .split('')
    .map(s => s.charCodeAt(0))
    .concat(10)

const A = encode(res.A)
const B = encode(res.B)
const C = encode(res.C)
const command = encode(res.command)

program[0] = 2
const inputs = [...command, ...A, ...B, ...C, ...encode('n')]
let last
intcode(program, inputs, o => (last = o))
console.log(last)
