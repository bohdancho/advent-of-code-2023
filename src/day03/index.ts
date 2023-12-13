const adjacentShifts = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
] as const

export function solvePartOne(input: string): number {
  const matrix = input.split('\n').map((row) => row.split(''))
  let sum = 0

  matrix.forEach((row, rowIndex) =>
    row.forEach((char, colIndex) => {
      if (char === '.' || isNumber(char)) return
      adjacentShifts.forEach(([rowShift, colShift]) => {
        const number = extractNumber(matrix[rowIndex + rowShift], colIndex + colShift)
        if (number) sum += number
      })
    }),
  )

  return sum
}

function extractNumber(row: string[], position: number): number | null {
  if (!row || !isNumber(row[position])) return null

  let start = position
  let end = position
  while (isNumber(row[start - 1])) {
    start--
  }
  while (isNumber(row[end + 1])) {
    end++
  }

  const number = Number(row.slice(start, end + 1).join(''))
  row.fill('.', start, end + 1)
  return number
}

function isNumber(str: string) {
  return !isNaN(Number(str))
}

export function solvePartTwo(input: string): number {
  const matrix = input.split('\n').map((row) => row.split(''))
  let sum = 0

  matrix.forEach((row, rowIndex) =>
    row.forEach((char, colIndex) => {
      if (char !== '*') return
      const adjacentNumbers = getAdjacentNumbers(matrix, rowIndex, colIndex)
      if (adjacentNumbers.length === 2) {
        sum += adjacentNumbers[0] * adjacentNumbers[1]
      }
    }),
  )

  return sum
}

function getAdjacentNumbers(matrix: string[][], rowIndex: number, colIndex: number) {
  const adjacentRowsCopy = matrix.slice(rowIndex - 1, rowIndex + 2).map((row) => row.join('').split(''))
  const adjacentNumbers: number[] = []
  adjacentShifts.forEach(([rowShift, colShift]) => {
    const number = extractNumber(adjacentRowsCopy[rowShift + 1], colIndex + colShift)
    if (number) adjacentNumbers.push(number)
  })
  return adjacentNumbers
}

const input = await Bun.file('./src/day3/input.txt').text()
console.log(solvePartOne(input))
console.log(solvePartTwo(input))
