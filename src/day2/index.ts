function solvePartOne(input: string) {
  const games = input.split('\n').slice(0, -1)

  let sum = 0
  games.forEach((game, index) => {
    if (isGamePossible(game, { red: 12, green: 13, blue: 14 })) {
      sum += index + 1
    }
  })

  return sum
}

const COLORS = ['red', 'green', 'blue'] as const
type Color = (typeof COLORS)[number]
export type Bag = { [key in Color]: number }
function isColor(str: string): str is Color {
  return COLORS.includes(str as Color)
}

export function isGamePossible(game: string, bag: Bag): boolean {
  const rawGame = game.split(': ')[1]
  const sets = rawGame.split('; ')
  for (const set of sets) {
    const cubes = set.split(', ')
    for (const cube of cubes) {
      const [amountStr, color] = cube.split(' ')
      const amount = Number(amountStr)

      if (isNaN(amount)) throw Error('invalid amount')
      if (!isColor(color)) throw Error(`invalid color: ${color}`)

      if (bag[color] < amount) {
        return false
      }
    }
  }

  return true
}

const input = await Bun.file('./src/day2/input.txt').text()
console.log(solvePartOne(input))
