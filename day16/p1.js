const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')[0]
const pattern = [0, 1, 0, -1]

const getNextVal = (arr, i) => {
  return (
    Math.abs(
      arr.reduce((sum, p, li) => {
        const group = Math.floor((li + 1) / (i + 1)) % 4
        return sum + p * pattern[group]
      }, 0)
    ) % 10
  )
}

let next = input.split('').map(Number)
for (let step = 0; step < 100; step++) {
  console.log(next.join(''))
  let newNext = []
  for (let i = 0; i < next.length; i++) {
    newNext.push(getNextVal(next, i))
  }
  next = newNext
}

console.log(next.slice(0, 8).join(''))

// 0,2,4,6,8,10
// 1,2,5,6,9,10
// 2,3,4,8,9,10
// 3,4,5,6
// 4,5,6,7,8
// 5,6,7,8,9,10
