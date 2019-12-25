const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

const key = ([x, y]) => `${x}_${y}`
const vizited = {}

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
console.log(vizited[target])
