const STATUS = {
  NEW: 0,
  RUN: 1,
  WAIT: 2,
  HALT: 99,
}

class Intcode {
  constructor() {
    this.status = STATUS.NEW
    this.memory = []
    this.inputs = []
    this.output = () => {}
    this.p = 0
    this.time = 0
    this.async = false
  }
  execute(memory, inputs = [], output = console.log) {
    this.memory = Array.from(memory)
    this.inputs = Array.from(inputs)
    this.output = output
    this.p = 0
    this.relativeBase = 0

    this.continue()
  }
  continue() {
    this.status = STATUS.RUN
    const memory = this.memory
    const inputs = this.inputs
    const output = this.output

    const getOpCode = op => Number(('' + op).substr(-2))

    const getAddr = (op, i, v) =>
      ('' + op).split('').reverse()[i + 1] === '2' ? this.relativeBase + v : v

    const getVal = (op, i, v) =>
      ('' + op).split('').reverse()[i + 1] === '1'
        ? v
        : memory[getAddr(op, i, v)] || 0

    const Stop = Symbol('STOP')

    const ops = {
      1: (op, a, b, c) =>
        (memory[getAddr(op, 3, c)] = getVal(op, 1, a) + getVal(op, 2, b)),
      2: (op, a, b, c) =>
        (memory[getAddr(op, 3, c)] = getVal(op, 1, a) * getVal(op, 2, b)),
      3: (op, a) => {
        if (inputs.length) {
          memory[getAddr(op, 1, a)] = inputs.shift()
        } else {
          this.p -= 2
          this.status = STATUS.WAIT
          return Stop
        }
      },
      4: (op, a) =>
        output(
          this.async
            ? { time: this.time, value: getVal(op, 1, a) }
            : getVal(op, 1, a)
        ),
      5: (op, a, b) => !!getVal(op, 1, a) && (this.p = getVal(op, 2, b)),
      6: (op, a, b) => !!getVal(op, 1, a) || (this.p = getVal(op, 2, b)),
      7: (op, a, b, c) =>
        (memory[getAddr(op, 3, c)] =
          getVal(op, 1, a) < getVal(op, 2, b) ? 1 : 0),
      8: (op, a, b, c) =>
        (memory[getAddr(op, 3, c)] =
          getVal(op, 1, a) === getVal(op, 2, b) ? 1 : 0),
      9: (op, a) => (this.relativeBase += getVal(op, 1, a)),
      99: op => {
        this.p--
        this.status = STATUS.HALT
        return Stop
      },
    }

    let result = null
    do {
      this.time++
      const op = memory[this.p++]
      const fn = ops[getOpCode(op)]
      const params = []
      for (let i = 0; i < fn.length - 1; i++) {
        params.push(memory[this.p++])
      }
      result = fn(op, ...params)
    } while (result !== Stop)
  }
}

function intcode(memory, inputs, output) {
  const instance = new Intcode()
  instance.execute(memory, inputs, output)
  return instance
}

intcode.Intcode = Intcode
intcode.STATUS = STATUS

module.exports = intcode
