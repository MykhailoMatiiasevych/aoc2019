const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const initProgram = input[0].split(',').map(Number)

const expected = 19690720

for (let noun = 0; noun < 100; noun++) {
  for (let verb = 0; verb < 100; verb++) {
    const program = Array.from(initProgram)
    program[1] = noun
    program[2] = verb

    const { memory } = intcode(program)

    if (memory[0] === expected) {
      console.log(100 * noun + verb)
      process.exit(0)
    }
  }
}
