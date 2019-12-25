const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')

const orbits = input
  .map(o => o.split(')'))
  .reduce((orbits, [center, sat]) => ({ ...orbits, [sat]: center }), {})

const getPath = (from, to) =>
  from === to ? [] : [orbits[from]].concat(getPath(orbits[from], to))

const p1 = getPath('YOU', 'COM')
const p2 = getPath('SAN', 'COM')

while (p1.pop() === p2.pop()) {}

console.log(p1.length + p2.length + 2) // two removed elemets
