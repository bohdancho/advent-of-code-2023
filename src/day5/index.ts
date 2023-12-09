export function solvePartOne(input: string): number {
  const blocks = input.slice(0, -1).split('\n\n')
  const seeds = blocks[0].split(': ')[1].split(' ').map(Number)
  const locations: number[] = []
  const maps = blocks.slice(1)

  seeds.forEach((seed) => {
    let mappedValue = seed
    maps.forEach((map) => {
      mappedValue = mapValue(mappedValue, map)
    })
    locations.push(mappedValue)
  })

  return Math.min(...locations)
}

function mapValue(value: number, map: string): number {
  for (const field of map.split('\n').slice(1)) {
    const [destination, source, range] = field.split(' ').map(Number)
    if (value >= source && value < source + range) {
      return destination + (value - source)
    }
  }
  return value
}

const input = await Bun.file('./src/day5/input.txt').text()
console.log('Part one: ', solvePartOne(input))
// console.log('Part two: ', solvePartTwo(input))
