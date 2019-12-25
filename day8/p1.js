const readToLines = require('../common/readToLines')

const input = readToLines('./input.txt')[0]

const width = 25
const height = 6
const delta = width * height
let layer = 0

const layers = []

while (input[layer * delta]) {
  layers[layer] = {}

  input
    .substring(layer * delta, (layer + 1) * delta)
    .split('')
    .reduce((res, s) => {
      res[s] ? res[s]++ : (res[s] = 1)
      return res
    }, layers[layer])

  layer++
}

const { result } = layers.reduce(
  (res, layer) =>
    layer['0'] < res.zeros
      ? { zeros: layer['0'], result: layer['1'] * layer['2'] }
      : res,
  { zeros: Number.MAX_SAFE_INTEGER, result: 0 }
)

console.log(result)
