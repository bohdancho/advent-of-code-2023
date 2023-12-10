export function solvePartOne(input: string): number {
  const matrix = input
    .slice(0, -1)
    .split('\n')
    .map((line) => line.split(''))

  let lastPos = getStartPos(matrix)
  let pos = getStartAdjacentPipe(matrix, getStartPos(matrix))
  let steps = 1
  while (matrix[pos[1]][pos[0]] !== 'S') {
    const newPos = getAdjacentPipe(matrix, pos, lastPos)
    lastPos = [...pos]
    pos = newPos
    steps++
  }
  return steps / 2
}

function getStartPos(matrix: string[][]): [number, number] {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] === 'S') {
        return [x, y]
      }
    }
  }
  throw Error('not found')
}

const shiftsMap = {
  '|': [
    [0, -1],
    [0, 1],
  ],
  '-': [
    [-1, 0],
    [1, 0],
  ],
  L: [
    [0, -1],
    [1, 0],
  ],
  J: [
    [0, -1],
    [-1, 0],
  ],
  '7': [
    [0, 1],
    [-1, 0],
  ],
  F: [
    [0, 1],
    [1, 0],
  ],
}

function getAdjacentPipe(matrix: string[][], pos: [number, number], lastPos: [number, number]): [number, number] {
  const symbol = matrix[pos[1]][pos[0]]
  for (const shift of shiftsMap[symbol as keyof typeof shiftsMap]) {
    const x = pos[0] + shift[0]
    const y = pos[1] + shift[1]
    if (x !== lastPos[0] || y !== lastPos[1]) {
      return [x, y]
    }
  }

  throw Error('no adjacent pipe')
}

function getStartAdjacentPipe(matrix: string[][], pos: [number, number]): [number, number] {
  for (const [symbol, shifts] of Object.entries(shiftsMap)) {
    for (const shift of shifts) {
      const x = pos[0] - shift[0]
      const y = pos[1] - shift[1]
      if (matrix[y][x] === symbol) {
        return [x, y]
      }
    }
  }
  throw Error('no start adjacent pipe')
}

const input = await Bun.file('./src/day10/input.txt').text()
console.log('Part one: ', solvePartOne(input))
// console.log('Part two: ', solvePartTwo(input))
