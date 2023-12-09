export function solvePartOne(input: string): number {
  const cards = input.split('\n').slice(0, -1)
  let sum = 0
  cards.forEach((card) => {
    const matches = getCardMatches(card)
    if (matches !== 0) sum += Math.pow(2, matches - 1)
  })
  return sum
}

function getCardMatches(str: string): number {
  let matches = 0
  const [ownNumbers, winningNumbers] = str
    .split(': ')[1]
    .split(' | ')
    .map((numbers) => numbers.split(' '))

  ownNumbers.forEach((number) => {
    if (number !== '' && winningNumbers.includes(number)) {
      matches++
    }
  })

  return matches
}

export function solvePartTwo(input: string): number {
  const cards = input.split('\n').slice(0, -1).map(getCardMatches)
  const resolvedCardsReversed: number[] = []
  for (let i = 0; i < cards.length; i++) {
    const shallowMatches = cards[cards.length - i - 1]
    const deepMatches = resolvedCardsReversed.slice(Math.max(i - shallowMatches, 0), i).reduce((acc, v) => acc + v, 0)
    resolvedCardsReversed.push(deepMatches + 1)
  }
  return resolvedCardsReversed.reduce((acc, v) => acc + v, 0)
}

const input = await Bun.file('./src/day4/input.txt').text()
console.log('Part one: ', solvePartOne(input))
console.log('Part two: ', solvePartTwo(input))
