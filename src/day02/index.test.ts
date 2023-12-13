import { expect, test, describe } from 'bun:test'
import { type Bag, isGamePossible } from './index'

const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`
  .split('\n')
  .slice(0, -1)
const expectedResults = [true, true, false, false, true]
const bag: Bag = { red: 12, green: 13, blue: 14 }

describe('is game possible', () => {
  input.forEach((game, index) => {
    test(`Game ${index + 1}`, () => {
      expect(isGamePossible(game, bag)).toBe(expectedResults[index])
    })
  })
})
