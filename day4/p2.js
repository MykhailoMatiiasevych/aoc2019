const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')
const [from, to] = input[0].split('-').map(Number)

const pattern = '1234567890'
  .split('')
  .map(v => `[^${v}]${v}${v}[^${v}]|^${v}${v}[^${v}]|[^${v}]${v}${v}$`)
  .join('|')

console.log(pattern)

const rules = [
  n => RegExp(pattern).test(n),
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
