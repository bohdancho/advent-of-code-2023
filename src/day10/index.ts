export function solvePartOne(input: string): number {
  const matrix = input
    .slice(0, -1)
    .split('\n')
    .map((line) => line.split(''))

  let lastPos = getStartPos(matrix)
  let pos = getStartAdjacentPipe(matrix, lastPos)
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
      if (matrix[y]?.[x] === symbol) {
        return [x, y]
      }
    }
  }
  throw Error('no start adjacent pipe')
}
type Position = [number, number]

export function solvePartTwo(input: string): number {
  let matrix = input
    .slice(0, -1)
    .split('\n')
    .map((line) => line.split(''))

  const pipes: Position[] = []
  pipes.push(getStartPos(matrix))
  pipes.push(getStartAdjacentPipe(matrix, pipes[0]))
  while (!isOnFinish(matrix, pipes)) {
    pipes.push(getAdjacentPipe(matrix, pipes[pipes.length - 1], pipes[pipes.length - 2]))
  }
  pipes.pop()

  matrix[pipes[0][1]][pipes[0][0]] = getStartSymbol(pipes)
  matrix = matrix.map((line, y) =>
    line.map((symbol, x) => {
      if (!pipes.some((pipe) => pipe[0] === x && pipe[1] === y)) {
        return '.'
      }
      return symbol
    }),
  )

  let enclosed = 0
  matrix = matrix.map((line, y) =>
    line.map((symbol, x) => {
      if (symbol !== '.') {
        return symbol
      }
      if (getIsEnclosed(matrix, [x, y])) {
        enclosed++
        return 'I'
      }
      return '.'
    }),
  )

  Bun.write('./src/day10/output.txt', matrix.map((line) => line.join('')).join('\n'))
  return enclosed
}

function isOnFinish(matrix: string[][], pipes: Position[]): boolean {
  const [x, y] = pipes[pipes.length - 1]
  return matrix[y][x] === 'S'
}

function getStartSymbol(pipes: Position[]): string {
  const startPos = pipes[0]
  const nextPos = pipes[1]
  const prevPos = pipes[pipes.length - 1]
  const posShift = [
    [prevPos[0] - startPos[0], prevPos[1] - startPos[1]],
    [nextPos[0] - startPos[0], nextPos[1] - startPos[1]],
  ]
  const match = Object.entries(shiftsMap).find(([, shift]) => {
    return (
      JSON.stringify(shift) === JSON.stringify(posShift) ||
      JSON.stringify(shift) === JSON.stringify(posShift.toReversed())
    )
  })
  if (!match) throw Error('no start symbol')
  return match[0]
}

const directions = [
  { coordinate: 0, step: 1 },
  { coordinate: 0, step: -1 },
  { coordinate: 1, step: 1 },
  { coordinate: 1, step: -1 },
]

function getIsEnclosed(matrix: string[][], pos: Position): boolean {
  for (const { coordinate, step } of directions) {
    const perpendicularCoordinate = coordinate === 0 ? 1 : 0
    const currentPos = [...pos]
    currentPos[coordinate] += step

    let isEnclosed = true
    let perpendicularShift = 0
    while (coordinate === 0 ? matrix[pos[1]]?.[currentPos[0]] : matrix[currentPos[1]]?.[pos[0]]) {
      const symbol = matrix[currentPos[1]][currentPos[0]]
      if (symbol !== '.') {
        const shifts = shiftsMap[symbol as keyof typeof shiftsMap]
        if (shifts[0][coordinate] === 0 && shifts[1][coordinate] === 0) {
          isEnclosed = !isEnclosed
        } else if (shifts[0][perpendicularCoordinate] !== 0 || shifts[1][perpendicularCoordinate] !== 0) {
          const newPerpendicularShift = shifts[0][perpendicularCoordinate] || shifts[1][perpendicularCoordinate]
          if (!perpendicularShift) {
            perpendicularShift = newPerpendicularShift
          } else {
            if (perpendicularShift !== newPerpendicularShift) {
              isEnclosed = !isEnclosed
            }
            perpendicularShift = 0
          }
        }
      }
      currentPos[coordinate] += step
    }
    if (isEnclosed) return false
  }
  return true
}

const input = await Bun.file('./src/day10/input.txt').text()
console.log('Part one: ', solvePartOne(input))
console.log('Part two: ', solvePartTwo(input))
