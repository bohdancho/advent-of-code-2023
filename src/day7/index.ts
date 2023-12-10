export function solvePartOne(input: string): number {
  const hands = input
    .slice(0, -1)
    .split('\n')
    .map((line) => {
      const [cards, bid] = line.split(' ')
      return { cards, bid: Number(bid) }
    })

  hands.sort((a, b) => {
    const combinationDifference = getCombinationStrength(a.cards) - getCombinationStrength(b.cards)
    if (combinationDifference !== 0) {
      return combinationDifference
    }
    return compareLabels(a.cards, b.cards)
  })

  let total = 0
  hands.forEach((hand, index) => (total += hand.bid * (index + 1)))
  return total
}

const combinations = [[1, 1, 1, 1, 1], [2, 1, 1, 1], [2, 2, 1], [3, 1, 1], [3, 2], [4, 1], [5]].map((v) =>
  JSON.stringify(v),
)
const labelsOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

function getCombinationStrength(cards: string): number {
  const occurances: Record<string, number> = {}
  cards.split('').forEach((card) => {
    if (!occurances[card]) {
      occurances[card] = 1
      return
    }
    occurances[card] += 1
  })
  const combination = Object.values(occurances).sort((a, b) => b - a)
  return combinations.indexOf(JSON.stringify(combination))
}

function compareLabels(a: string, b: string) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return labelsOrder.indexOf(b[i]) - labelsOrder.indexOf(a[i])
    }
  }
  return 0
}

const input = await Bun.file('./src/day7/input.txt').text()
console.log('Part one: ', solvePartOne(input))
// console.log('Part two: ', solvePartTwo(input))
