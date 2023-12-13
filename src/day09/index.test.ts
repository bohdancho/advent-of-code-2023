import { expect, test } from 'bun:test'
import { solvePartOne } from './index'

const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45\n`

test('part one', () => {
  expect(solvePartOne(input)).toBe(114)
})
