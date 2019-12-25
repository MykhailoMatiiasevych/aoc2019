const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')

function solve3(input, N, x, rep = 1) {
  let [a, b] = input.reduceRight(
    ([a, b], line) => {
      if (/new stack/.test(line)) return [(N - a) % N, (N + N - b - 1) % N]
      let r = line.match(/increment (\d+)/)
      if (r) {
        const aa = Number(r[1])
        return [modDiv(a, aa, N), modDiv(b, aa, N)]
      }
      r = line.match(/cut (-?\d+)/)
      if (r) {
        const bb = Number(r[1])
        return [a, (((b + bb) % N) + N) % N]
      }
    },
    [1, 0]
  )

  console.log(a, b)
  while (rep) {
    if (rep % 2) x = (mulMod(x, a, N) + b) % N
    ;[a, b] = [mulMod(a, a, N), (mulMod(a, b, N) + b) % N]
    rep = Math.floor(rep / 2)
  }
  return x
}
console.log(solve3(input, 119315717514047, 2020, 101741582076661))

function gcdExtended(a, b) {
  let x = 0,
    y = 1,
    u = 1,
    v = 0
  while (a !== 0) {
    let q = Math.floor(b / a)
    ;[x, y, u, v] = [u, v, x - u * q, y - v * q]
    ;[a, b] = [b % a, a]
  }
  return [b, x, y]
}
function modInverse(a, m) {
  const [g, x] = gcdExtended(a, m)
  if (g !== 1) throw 'Bad mod inverse'
  return (x + m) % m
}
function modDiv(a, b, m) {
  return Number((BigInt(a) * BigInt(modInverse(b, m))) % BigInt(m))
}
function mulMod(a, b, m) {
  return Number((BigInt(a) * BigInt(b)) % BigInt(m))
}
