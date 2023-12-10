import { expect, test } from 'bun:test'
import { solvePartOne } from './index'

const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483\n`

test('part one', () => {
  expect(solvePartOne(input)).toBe(6440)
})
