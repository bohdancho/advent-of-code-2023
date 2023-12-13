export function solvePartOne(input: string): number {
  const matrix = input.trim().split('\n')

  let total = 0
  matrix.forEach((line, index) => {
    console.log('line', index)
    total += getNumberOfArragements(line)
  })
  return total
}

function getNumberOfArragements(line: string) {
  const blocks = line.split(' ')
  let springs = [blocks[0].split('')]
  const conditions = JSON.stringify(blocks[1].split(',').map((num) => Number(num)))

  for (let i = 0; i < springs[0].length; i++) {
    if (springs[0][i] !== '?') continue

    const newSprings: string[][] = []
    springs.forEach((spring) => {
      newSprings.push(spring.with(i, '.'))
      newSprings.push(spring.with(i, '#'))
    })
    springs = newSprings
  }

  return springs.filter((spring) => {
    const groupsLengths = spring
      .join('')
      .replace(/\.{2,}/g, '.')
      .split('.')
      .map((group) => group.length)
      .filter((length) => length !== 0)
    return JSON.stringify(groupsLengths) === conditions
  }).length
}

const input = await Bun.file('./src/day12/input.txt').text()
console.log('Part one: ', solvePartOne(input))
// console.log('Part two: ', solvePartTwo(input))
