import { expect, test } from 'bun:test'
import { solve } from './index'

const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....\n`

test('part one', () => {
  expect(solve(input)).toBe(374)
})

test('part two 1', () => {
  expect(solve(input, 10)).toBe(1030)
})

test('part two 2', () => {
  expect(solve(input, 100)).toBe(8410)
})
