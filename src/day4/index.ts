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
  const originalCards: { index: number; matches: number }[] = input
    .split('\n')
    .slice(0, -1)
    .map((card, index) => ({
      index,
      matches: getCardMatches(card),
    }))
  const cardCopies = structuredClone(originalCards)

  for (let i = 0; i < cardCopies.length; i++) {
    const card = cardCopies[i]
    if (!card) continue
    const { index: originalIndex, matches } = card

    const prizeCards = originalCards.slice(originalIndex + 1, originalIndex + matches + 1)
    cardCopies.push(...prizeCards)
  }

  return cardCopies.length
}

const input = await Bun.file('./src/day4/input.txt').text()
console.log('Part one: ', solvePartOne(input))
console.log('Part two: ', solvePartTwo(input))
