console.time('Day 24 part 1')

const readToLines = require('../common/readToLines')

const input = readToLines('./input.txt')
// const input = [
// '....#',
// '#..#.',
// '#..##',
// '..#..',
// '#....'
// ]

const print = m => {
  console.log(m.slice(0, 5))
  if (m.length > 5) print(m.slice(5))
}

const visited = {}
let map = input
  .join('')
  .split('')
  .map(v => (v === '.' ? 0 : 1))

while (!visited[map.join('')]) {
  // print(map.map(v => v ? '#':'.').join(''))
  // console.log()
  visited[map.join('')] = 1
  map = map.map((ch, i, map) => {
    const adj = [
      map[i - 5],
      map[i + 5],
      i % 5 && map[i - 1],
      (i + 1) % 5 && map[i + 1],
    ]
    const l = adj.filter(v => v === 1).length
    if (!ch) {
      return l === 1 || l === 2 ? 1 : 0
    } else {
      return l === 1 ? 1 : 0
    }
  })
}

const res = parseInt(map.reverse().join(''), 2)
console.log(res)

console.timeEnd('Day 24 part 1')
