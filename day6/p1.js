const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')

const orbits = input
  .map(o => o.split(')'))
  .reduce((orbits, [center, sat]) => {
    orbits[center] = orbits[center] || []
    orbits[center].push(sat)

    return orbits
  }, {})

let centers = ['COM']
let currentDistance = 0
let totalDistance = 0

while (centers.length) {
  currentDistance++
  centers = centers
    .map(center => orbits[center] || [])
    .reduce((res, arr) => res.concat(arr), [])
  totalDistance += currentDistance * centers.length
}

console.log(totalDistance)
