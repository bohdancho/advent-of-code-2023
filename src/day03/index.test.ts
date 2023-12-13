import { expect, test } from 'bun:test'
import { solvePartOne, solvePartTwo } from './index'

const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

test('engine numbers', () => {
  expect(solvePartOne(input)).toBe(4361)
})

test('gear ratios', () => {
  expect(solvePartTwo(input)).toBe(467835)
})
