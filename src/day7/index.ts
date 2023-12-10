export function solve(input: string, useWildCard = false): number {
  const hands = input
    .slice(0, -1)
    .split('\n')
    .map((line) => {
      const [cards, bid] = line.split(' ')
      return { cards, bid: Number(bid) }
    })

  hands.sort((a, b) => {
    const combinationDifference =
      getCombinationStrength(a.cards, useWildCard) - getCombinationStrength(b.cards, useWildCard)
    if (combinationDifference !== 0) {
      return combinationDifference
    }
    return compareLabels(a.cards, b.cards, useWildCard)
  })

  let total = 0
  hands.forEach((hand, index) => (total += hand.bid * (index + 1)))
  return total
}

const combinations = [[1, 1, 1, 1, 1], [1, 1, 1, 2], [1, 2, 2], [1, 1, 3], [2, 3], [1, 4], [5]].map((v) =>
  JSON.stringify(v),
)

function getCombinationStrength(cards: string, useWildCard = false): number {
  const occurances: Record<string, number> = {}
  cards.split('').forEach((card) => {
    if (!occurances[card]) {
      occurances[card] = 1
      return
    }
    occurances[card] += 1
  })

  let wildCardsAmount = 0
  if (useWildCard && 'J' in occurances && occurances['J'] !== 5) {
    wildCardsAmount = occurances['J']
    delete occurances['J']
  }

  const combination = Object.values(occurances).sort((a, b) => a - b)
  combination[combination.length - 1] += wildCardsAmount
  return combinations.indexOf(JSON.stringify(combination))
}

const labelsOrderNormal = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const labelsOrderWildcard = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']
function compareLabels(a: string, b: string, useWildCard = false) {
  const labelsOrder = useWildCard ? labelsOrderWildcard : labelsOrderNormal
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return labelsOrder.indexOf(b[i]) - labelsOrder.indexOf(a[i])
    }
  }
  return 0
}

const input = await Bun.file('./src/day7/input.txt').text()
console.log('Part one: ', solve(input))
console.log('Part two: ', solve(input, true))
