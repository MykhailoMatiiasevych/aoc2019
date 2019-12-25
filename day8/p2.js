const readToLines = require('../common/readToLines')

const input = readToLines('./input.txt')[0]

const width = 25
const height = 6
const delta = width * height
let layer = 0

const result = Array(delta).fill('2')

while (input[layer * delta]) {
  input
    .substring(layer * delta, (layer + 1) * delta)
    .split('')
    .forEach((s, i) => result[i] === '2' && (result[i] = s))

  layer++
}

for (let i = 0; i < height; i++) {
  console.log(
    result
      .slice(i * width, (i + 1) * width)
      .join('')
      .replace(/0/g, ' ')
      .replace(/1/g, '█')
  )
}
