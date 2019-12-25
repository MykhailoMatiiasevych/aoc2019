module.exports = input => {
  const FUEL = 'FUEL'
  const ORE = 'ORE'

  const parseIng = str => {
    const parts = str.trim().split(' ')
    const amount = Number(parts[0].trim())
    const name = parts[1].trim()
    return { name, amount }
  }

  const receipts = input.reduce((res, line) => {
    const parts = line.split('=>')
    const ings = parts[0].split(',').map(parseIng)
    const current = parseIng(parts[1])
    current.ings = ings

    return {
      ...res,
      [current.name]: current,
    }
  }, {})

  const store = {}

  const produce = (what, amount) => {
    if (!store[what]) store[what] = 0

    store[what] -= amount

    if (what === ORE || store[what] >= 0) {
      return
    }

    const rec = receipts[what]

    const toProduce = Math.abs(store[what])
    let cycles = Math.ceil(toProduce / rec.amount)
    rec.ings.forEach(e => produce(e.name, e.amount * cycles))
    store[what] = rec.amount * cycles - toProduce
  }

  return { ORE, FUEL, store, produce }
}
