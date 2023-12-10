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

  const currentNodes = Object.keys(map).filter((node) => node.endsWith('A'))
  const cycleLengths: number[] = []
  for (let i = 0; i < currentNodes.length; i++) {
    let step = 0
    let globalStep = 0
    while (!currentNodes[i].endsWith('Z')) {
      const options = map[currentNodes[i]]
      const choice = instructions[step] === 'L' ? 0 : 1
      currentNodes[i] = options[choice]

      globalStep++
      if (step === instructions.length - 1) {
        step = 0
      } else {
        step++
      }
    }
    cycleLengths.push(globalStep)
  }

  let totalLcm = 1
  cycleLengths.forEach((cycle) => {
    totalLcm = getLcm(totalLcm, cycle)
  })
  return totalLcm
}

function getLcm(x: number, y: number) {
  return (x * y) / getGcd(x, y)
}

function getGcd(x: number, y: number) {
  while (y) {
    const t = y
    y = x % y
    x = t
  }
  return x
}

const input = await Bun.file('./src/day8/input.txt').text()
console.log('Part one: ', solvePartOne(input))
console.log('Part two: ', solvePartTwo(input))
