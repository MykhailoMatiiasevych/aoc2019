console.time('Day 23 part 1')

const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

const out = []
const temp = {}
const comps = []

for (let i = 0; i < 50; i++) {
  const inst = intcode(program, [], v => {
    if (!temp[i]) temp[i] = []
    temp[i].push(v.value)
    if (temp[i].length === 3) {
      out.push({ time: v.time, id: i, value: temp[i] })
      delete temp[i]
    }
  })
  comps.push(inst)
  inst.inputs = [i, -1]
  inst.async = true
  inst.continue()
}
out.sort((a, b) => a.time - b.time)

while (true) {
  const minComp = comps.reduce((minComp, comp) =>
    comp.time < minComp.time ? comp : minComp
  )
  const cmd = out[0]
  if (!cmd || minComp.time < cmd.time) {
    minComp.inputs.push(-1)
    minComp.continue()
  } else {
    const [addr, x, y] = cmd.value
    if (addr === 255) {
      console.log(y)
      break
    }
    const comp = comps[addr]
    if (comp.time >= cmd.time) {
      comp.inputs.push(x, y)
      out.shift()
    }
  }

  out.sort((a, b) => a.time - b.time)
}

console.timeEnd('Day 23 part 1')
