const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

const results = []
const amplifier = (modes, inp) => {
  if (!modes.length) {
    results.push(inp)
    return
  }

  let out
  const saveOut = v => (out = v)

  modes.forEach((mode, i) => {
    intcode(program, [mode, inp], saveOut)
    const newModes = Array.from(modes)
    newModes.splice(i, 1)
    amplifier(newModes, out)
  })
}

amplifier([0, 1, 2, 3, 4], 0)

console.log(Math.max(...results))
