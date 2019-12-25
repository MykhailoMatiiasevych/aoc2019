const readToLines = require('../common/readToLines')

const input = readToLines('./input.txt')

const wire1 = new Map()
const cross = []

let current
let step
const goTo = f => ({ direction, distance }) => {
  for (let i = 1; i <= distance; i++) {
    step++
    switch (direction) {
      case 'U':
        current[1]++
        break
      case 'D':
        current[1]--
        break
      case 'L':
        current[0]--
        break
      case 'R':
        current[0]++
        break
    }
    f(current, step)
  }
}

const key = ([x, y]) => `${x}:${y}`

current = [0, 0]
step = 0
input[0]
  .split(',')
  .map(([direction, ...distance]) => ({
    direction,
    distance: Number(distance.join('')),
  }))
  .forEach(goTo((p, step) => wire1.has(key(p)) || wire1.set(key(p), step)))

current = [0, 0]
step = 0
input[1]
  .split(',')
  .map(([direction, ...distance]) => ({
    direction,
    distance: Number(distance.join('')),
  }))
  .forEach(
    goTo((p, step) => wire1.has(key(p)) && cross.push(wire1.get(key(p)) + step))
  )

const closest = Math.min(...cross)

console.log(closest)
