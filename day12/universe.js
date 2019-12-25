class Universe {
  constructor(moons) {
    this.moons = moons
    this.velocity = Array(this.moons.length).fill(
      Array(this.moons[0].length).fill(0)
    )
  }

  step() {
    for (let i = 0; i < this.moons.length; i++) {
      for (let j = 0; j < this.moons.length; j++) {
        if (i === j) continue
        this.velocity[i] = this.velocity[i].map(
          (vel, coord) =>
            vel +
            (this.moons[i][coord] > this.moons[j][coord]
              ? -1
              : this.moons[i][coord] < this.moons[j][coord]
              ? 1
              : 0)
        )
      }
    }

    this.moons = this.moons.map((moon, mi) =>
      moon.map((coord, p) => coord + this.velocity[mi][p])
    )
  }
}

module.exports = Universe
