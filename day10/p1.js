const readToLines = require('../common/readToLines')

const input = readToLines('./input.txt')

const key = ({ x, y }) => `${x}_${y}`

const asteroids = input
  .map((s, y) =>
    s
      .split('')
      .map((a, x) => (a === '#' ? { x, y } : null))
      .filter(Boolean)
  )
  .reduce((res, l) => res.concat(l), [])
  .reduce((res, a) => ({ ...res, [key(a)]: a }), {})

const visibility = {}

const addVisibility = (a, b) => {
  visibility[key(a)] = visibility[key(a)] || []
  visibility[key(a)].push(b)
}

const isVisible = (a, b) => {
  const A = a.y - b.y
  const B = b.x - a.x
  const C = a.x * b.y - b.x * a.y

  for (let x = Math.min(a.x, b.x) + 1; x < Math.max(a.x, b.x); x++) {
    const y = (-A * x - C) / B
    if (asteroids[key({ x, y })]) return false
  }

  for (let y = Math.min(a.y, b.y) + 1; y < Math.max(a.y, b.y); y++) {
    const x = (-B * y - C) / A
    if (asteroids[key({ x, y })]) return false
  }

  return true
}

const coords = Object.values(asteroids)
coords.forEach((a, i) => {
  for (let j = i + 1; j < coords.length; j++) {
    if (isVisible(a, coords[j])) {
      addVisibility(a, coords[j])
      addVisibility(coords[j], a)
    }
  }
})

const maxLength = Math.max(...Object.values(visibility).map(v => v.length))
console.log(maxLength)

module.exports = {
  maxLength,
  visibility,
  key,
}
