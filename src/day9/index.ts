export function solvePartOne(input: string): number {
  const histories = input
    .slice(0, -1)
    .split('\n')
    .map((line) => line.split(' ').map(Number))
  let total = 0

  histories.forEach((history) => {
    const sequences = [history]
    while (sequences.at(-1)?.some((v) => v !== 0)) {
      const lastSequence = sequences.at(-1) as number[]
      const newSequence = []
      for (let i = 0; i < lastSequence.length - 1; i++) {
        newSequence.push(lastSequence[i + 1] - lastSequence[i])
      }
      sequences.push(newSequence)
    }

    sequences.at(-1)?.push(0)
    for (let i = sequences.length - 2; i >= 0; i--) {
      sequences[i].push(<number>sequences[i].at(-1) + <number>sequences[i + 1].at(-1))
    }
    total += sequences[0].at(-1) as number
  })

  return total
}

const input = await Bun.file('./src/day9/input.txt').text()
console.log('Part one: ', solvePartOne(input))
// console.log('Part two: ', solvePartTwo(input))
