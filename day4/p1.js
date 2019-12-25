const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
const [from, to] = input[0].split('-').map(Number)

const rules = [
  n => /11|22|33|44|55|66|77|88|99|00/.test(n),
  n =>
    n
      .split('')
      .map(Number)
      .reduce((res, v) => (res === false ? res : v >= res && v), 0),
]

let valid = 0
for (let i = from; i <= to; i++) {
  const value = String(i)
  rules.reduce((res, f) => res && !!f(value), true) && valid++
}

console.log(valid)
