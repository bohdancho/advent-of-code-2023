export function solve(input: string, expansionFactor = 2): number {
  const matrix = input
    .slice(0, -1)
    .split('\n')
    .map((line) => line.split(''))

  markExpandedRows(matrix)
  markExpandedColums(matrix)

  Bun.write('./src/day11/output.txt', matrix.map((line) => line.join('')).join('\n'))

  const galaxies: { x: number; y: number }[] = []
  let expandedY = 0
  matrix.forEach((row) => {
    if (row.every((char) => char === '!')) {
      expandedY += expansionFactor
      return
    }

    let expandedX = 0
    row.forEach((char) => {
      if (char === '#') {
        galaxies.push({ x: expandedX, y: expandedY })
      }
      if (char === '!') {
        expandedX += expansionFactor
      } else {
        expandedX++
      }
    })

    expandedY++
  })

  let total = 0
  galaxies.forEach((galaxy, index) => {
    galaxies.slice(index + 1).forEach((distantGalaxy) => {
      total += Math.abs(distantGalaxy.x - galaxy.x) + Math.abs(distantGalaxy.y - galaxy.y)
    })
  })
  return total
}

function markExpandedRows(matrix: string[][]) {
  matrix.forEach((row, y) => {
    if (row.every((char) => char === '.')) {
      matrix[y] = Array(row.length).fill('!')
    }
  })
}

function markExpandedColums(matrix: string[][]) {
  for (let i = 0; i < matrix[0].length; i++) {
    if (matrix.every((row) => row[i] === '.' || row[i] === '!')) {
      matrix.forEach((row) => (row[i] = '!'))
    }
  }
}
const input = await Bun.file('./src/day11/input.txt').text()
console.log('Part one: ', solve(input))
console.log('Part two: ', solve(input, 1000000))
