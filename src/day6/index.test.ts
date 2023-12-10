import { expect, test } from 'bun:test'
import { solvePartOne, solvePartTwo } from './index'

const input = `Time:      7  15   30
Distance:  9  40  200\n`

test('part one', () => {
  expect(solvePartOne(input)).toBe(288)
})

test('part two', () => {
  expect(solvePartTwo(input)).toBe(71503)
})
