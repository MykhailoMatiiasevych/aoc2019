const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

const key = ([x, y]) => `${x}_${y}`
const unKey = k => k.split('_').map(Number)
let vizited = {}

const out = []
const last = () => out[out.length - 1]
const robot = intcode(program, [], o => out.push(o))

const moves = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
]
const back = [1, 0, 3, 2]
let target

const doMove = (pos = [0, 0], move, steps = 0) => {
  let nextPos = pos
  if (move !== undefined) {
    nextPos = [pos[0] + moves[move][0], pos[1] + moves[move][1]]
    const stepsTo = vizited[key(nextPos)]
    if (stepsTo && stepsTo <= steps) {
      return
    }
    robot.inputs = [move + 1]
    robot.continue()
    const res = last()
    if (res === 0) {
      // wall
      vizited[key(nextPos)] = -1
      return
    }
    vizited[key(nextPos)] = steps
    if (res === 2) {
      target = key(nextPos)
    }
  } else {
    vizited[key(nextPos)] = steps
  }

  if (last() !== 2) {
    moves.forEach((_, i) => doMove(nextPos, i, steps + 1))
  }
  // move back

  robot.inputs = [back[move] + 1]
  robot.continue()
}

doMove()

const ox = unKey(target)
Object.keys(vizited).forEach(k => {
  if (vizited[k] >= 0) {
    vizited[k] = 0
  }
})

let next = [ox]
let step = 0

do {
  const newNext = []
  next.forEach(p => {
    vizited[key(p)] = step
    moves.forEach(move => {
      const toAdd = [p[0] + move[0], p[1] + move[1]]
      if (vizited[key(toAdd)] === 0) {
        newNext.push(toAdd)
      }
    })
  })

  step++
  next = newNext
} while (next.length !== 0)

console.log(Math.max(...Object.values(vizited)))
