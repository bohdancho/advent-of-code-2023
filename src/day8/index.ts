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

export function solvePartTwo(input: string): number {
  const [instructions, mapStr] = input.slice(0, -1).split('\n\n')
  const map: Record<string, [string, string]> = {}
  mapStr.split('\n').forEach((line) => {
    const [node, optionsStr] = line.split(' = ')
    map[node] = optionsStr.slice(1, -1).split(', ') as [string, string]
  })

  const currentNodes = Object.keys(map)
    .filter((node) => node.endsWith('A'))
    .slice(5, 6) // i just did LCM "by hand" lol
  let step = 0
  let globalStep = 0
  while (globalStep < 100000) {
    for (let i = 0; i < currentNodes.length; i++) {
      const options = map[currentNodes[i]]
      const choice = instructions[step] === 'L' ? 0 : 1
      currentNodes[i] = options[choice]
    }
    globalStep++
    if (step === instructions.length - 1) {
      step = 0
    } else {
      step++
    }
    if (currentNodes.every((node) => node.endsWith('Z'))) {
      console.log(globalStep)
    }
  }
  return globalStep
}

const input = await Bun.file('./src/day8/input.txt').text()
console.log('Part one: ', solvePartOne(input))
// console.log('Part two: ', solvePartTwo(input))
