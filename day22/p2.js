console.time('Day 22 Part 2')
const readToLines = require('../common/readToLines')
const input = readToLines('./input.txt')

const length = 119315717514047
let rep = 101741582076661
let target = 2020

const inverse = (a, m) => {
  let t = 0,
    newt = 1,
    r = m,
    newr = a
  while (newr) {
    const quotient = Math.floor(r / newr)
    ;[t, newt] = [newt, t - quotient * newt]
    ;[r, newr] = [newr, r - quotient * newr]
  }
  if (r > 1) return 'a is not invertible'
  if (t < 0) t = t + n
  return t
}

const shuffle = pos => {
  for (let i = input.length - 1; i >= 0; i--) {
    const cmd = input[i]

    if (cmd.startsWith('cut')) {
      const n = -Number(cmd.split(' ')[1]) % length
      if (n > 0) {
        if (n - 1 >= pos) {
          pos += length - n
        } else {
          pos -= n
        }
      } else {
        if (length + n <= pos) {
          pos -= length + n
        } else {
          pos -= n
        }
      }
    } else if (cmd.startsWith('deal into')) {
      pos = length - pos - 1
    } else {
      // deal with increment
      const v = Number(cmd.split(' ')[3])
      for (t = 0; t < v; t++) {
        const tpos = t * length + pos
        if (tpos % v === 0) {
          pos = tpos / v
          break
        }
      }
    }
  }

  return pos
}
// b + a*n

let offset = shuffle(0)
let increment = (shuffle(1) - offset + length) % length

let a = increment
let b = offset
// const calc = t => (((a * t) % length) + b) % length

// console.log(a, b, calc(5540))

const mulMod = (a, b, m) => {
  return Number((BigInt(a) * BigInt(b)) % BigInt(m))
}

const pow = (base, p, mod) => {
  if (p === 0) return 1
  if (p === 1) return base
  let res = base
  let cp = 1
  while (cp * 2 <= p) {
    res = mulMod(res, res, mod)
    cp *= 2
  }
  return mulMod(pow(base, p - cp, mod), res, mod)
}
// length is prime so can use shorter variant
const inv = (v, l) => pow(v, l - 2, l)

const A = pow(a, rep, length)

const a1 = mulMod(A, target, length)
// const b1 = mulMod(mulMod(b, 1 - A, length), -inverse(1 - a, length), length) + length
const b1 = mulMod(mulMod(b, 1 - A, length), inv(1 - a, length), length) + length
console.log((a1 + b1) % length)

// Both following solutions compute [a,b] directly from input so I have adapted
// only parts with final calculations

// ====================== Solution by nutki2 https://www.reddit.com/user/nutki2/

let rr = rep
let tt = target
while (rr) {
  if (rr % 2) tt = (mulMod(tt, a, length) + b) % length
  ;[a, b] = [mulMod(a, a, length), (mulMod(a, b, length) + b) % length]
  rr = Math.floor(rr / 2)
}

console.log(tt)

// ====================== Adapted solution by https://github.com/jwise

rr = rep
tt = target
while (rr > 0) {
  let reduced = 1
  let mul = increment
  let add = offset
  while (reduced * 2 < rr) {
    ;[mul, add] = [
      mulMod(mul, mul, length),
      (mulMod(add, mul, length) + add) % length,
    ]
    reduced *= 2
  }
  tt = (mulMod(tt, mul, length) + add) % length
  rr -= reduced
}

console.log(tt)

console.timeEnd('Day 22 Part 2')
