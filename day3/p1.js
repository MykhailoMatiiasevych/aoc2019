const readToLines = require('../common/readToLines')

const input = readToLines('./input.txt')

const wire1 = new Set()
const cross = new Set()

let current
const goTo = f => ({ direction, distance }) => {
  for (let i = 1; i <= distance; i++) {
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
    f(current)
  }
}

current = [0, 0]
input[0]
  .split(',')
  .map(([direction, ...distance]) => ({
    direction,
    distance: Number(distance.join('')),
  }))
  .forEach(goTo(p => wire1.add(p.join(':'))))

current = [0, 0]
input[1]
  .split(',')
  .map(([direction, ...distance]) => ({
    direction,
    distance: Number(distance.join('')),
  }))
  .forEach(goTo(([x, y]) => wire1.has(`${x}:${y}`) && cross.add([x, y])))

const closest = Math.min(
  ...Array.from(cross.values()).map(([x, y]) => Math.abs(x) + Math.abs(y))
)

console.log(closest)
