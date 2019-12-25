const intcode = require('../common/intcode')

const key = (x, y) => `${x}_${y}`
const unKey = k => k.split('_').map(Number)

module.exports = {
  key,
  unKey,
  robot: (program, map) => {
    let out = []
    const robot = intcode(program, [], o => out.push(o))

    let x = 0
    let y = 0
    let direction = { x: 0, y: 1 }

    // 0 - left, 1 - right
    // left: [0,1] => [-1, 0] => [0, -1] => [1, 0]
    // right: [0,1] => [1, 0] => [0, -1] => [-1, 0]
    const rotate = where => {
      switch (where) {
        case 0:
          direction = { x: -direction.y, y: direction.x }
          break
        case 1:
          direction = { x: direction.y, y: -direction.x }
          break
      }
    }

    while (robot.status === intcode.STATUS.WAIT) {
      robot.inputs = [map[key(x, y)] || 0]
      robot.continue()
      map[key(x, y)] = out[0]
      rotate(out[1])
      x += direction.x
      y += direction.y
      out = []
    }
  },
}
