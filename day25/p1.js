console.time('Day 25 part 1')

const readToLines = require('../common/readToLines')
const intcode = require('../common/intcode')

const input = readToLines('./input.txt')
const program = input[0].split(',').map(Number)

let outArr = []
const out = v => outArr.push(v)

const print = () => {
  let line = ''
  outArr.forEach(o => {
    if (o === 10) {
      console.log(line)
      line = ''
    } else if (o > 255) {
      line += o
    } else {
      line += String.fromCharCode(o)
    }
  })
  if (line) {
    console.log(line)
  }
}

const encode = str => str.split('').map(s => s.charCodeAt(0))

// ABCD4679
for (let i = 0; i < 256; i++) {
  outArr = []
  let commands = ''
  commands += 'east\n'
  if (i & 128) {
    commands += 'take antenna\n' // A
  }
  commands += 'west\nnorth\n'
  if (i & 64) {
    commands += 'take weather machine\n' //B
  }
  commands += 'north\n'
  if (i & 32) {
    commands += 'take klein bottle\n' //C
  }
  commands += 'east\n'
  if (i & 16) {
    commands += 'take spool of cat6\n' //D ====
  }
  commands += 'east\nnorth\n'
  // commands += 'take infinite loop\n' //3
  commands += 'west\n'
  // commands += 'take giant electromagnet\n' //2
  commands += 'west\n'
  // commands += 'take escape pod\n' //1
  commands += 'east\nnorth\n'
  if (i & 8) {
    commands += 'take cake\n' //4 ====
  }
  commands += 'south\neast\neast\nnorth\n'
  // commands += 'take molten lava\n' //5
  commands += 'north\n'
  if (i & 4) {
    commands += 'take tambourine\n' //6 ====
  }
  commands += 'south\nsouth\nsouth\n'
  if (i & 2) {
    commands += 'take shell\n' //7 ====
  }
  commands += 'east\nsouth\n'
  // commands += 'take photons\n' //8
  //go back
  commands += 'north\nwest\n'
  commands += 'north\nwest\nsouth\nsouth\n'
  if (i & 1) {
    commands += 'take mug\n' //9 ====
  }
  commands += 'north\nwest\nsouth\nsouth\n'
  // commands += 'inv\n'
  commands += 'east\n'

  intcode(program, encode(commands), out)

  // print()
  if (
    outArr
      .map(o => String.fromCharCode(o))
      .join('')
      .indexOf('than the detected value!') < 0
  ) {
    print()
    console.log(i)
    break
  }
}

console.timeEnd('Day 25 part 1')
