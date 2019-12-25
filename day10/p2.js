const { maxLength, visibility, key } = require('./p1')

const stationCoords = Object.keys(visibility)
  .find(k => visibility[k].length === maxLength)
  .split('_')
  .map(Number)
const station = { x: stationCoords[0], y: stationCoords[1] }

// There are more then 200 asteroids visible. if less - we need to destroy all and calculate new visible list for station only

// 4 | 1
// __|__
//   |
// 3 | 2

const getQuadrant = a => {
  if (a.x >= station.x) {
    if (a.y <= station.y) {
      return 1
    } else {
      return 2
    }
  } else {
    if (a.y <= station.y) {
      return 4
    } else {
      return 3
    }
  }
}

visibility[key(station)].sort((a, b) => {
  const qa = getQuadrant(a)
  const qb = getQuadrant(b)

  if (qa !== qb) {
    return qa - qb
  }

  const aA = a.y - station.y
  const aB = station.x - a.x

  const bA = b.y - station.y
  const bB = station.x - b.x

  let inf
  if (qa === 1 || qa === 3) {
    inf = Number.POSITIVE_INFINITY
  } else {
    inf = Number.NEGATIVE_INFINITY
  }

  const kA = aB === 0 ? inf : -aA / aB
  const kB = bB === 0 ? inf : -bA / bB
  return kA - kB
})

const targetNumber = 200

const target = visibility[key(station)][targetNumber - 1]
console.log(target.x * 100 + target.y)
