export function solvePartOne(input: string): number {
  const [instructions, mapStr] = input.slice(0, -1).split('\n\n')
  const map: Record<string, [string, string]> = {}
  mapStr.split('\n').forEach((line) => {
    const [node, optionsStr] = line.split(' = ')
    map[node] = optionsStr.slice(1, -1).split(', ') as [string, string]
  })

  let currentNode = 'AAA'
  let step = 0
  let i = 0
  while (currentNode !== 'ZZZ') {
    const options = map[currentNode]
    const choice = instructions[i] === 'L' ? 0 : 1
    currentNode = options[choice]
    step++
    if (i === instructions.length - 1) {
      i = 0
    } else {
      i++
    }
  }
  return step
}

const input = await Bun.file('./src/day8/input.txt').text()
console.log('Part one: ', solvePartOne(input))
// console.log('Part two: ', solvePartTwo(input))
