const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

const results = []

let out
const saveOut = v => (out = v)

const runNext = (amplifiers, input) => {
  current = amplifiers.shift()
  if (current.status === intcode.STATUS.HALT) {
    return input
  }
  amplifiers.push(current)
  current.inputs = [input]
  current.continue()
  return runNext(amplifiers, out)
}

const starter = (modes, order) => {
  if (!modes.length) {
    const amplifiers = order.map(o => intcode(program, [o], saveOut))
    results.push(runNext(amplifiers, 0))
    return
  }

  modes.forEach((mode, i) => {
    const newModes = Array.from(modes)
    newModes.splice(i, 1)
    starter(newModes, [...order, mode])
  })
}

starter([5, 6, 7, 8, 9], [])
console.log(Math.max(...results))
