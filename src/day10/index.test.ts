import { expect, test } from 'bun:test'
import { solvePartOne } from './index'

const input1 = `.....
.S-7.
.|.|.
.L-J.
.....\n`

const input2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...\n`

test('part one 1', () => {
  expect(solvePartOne(input1)).toBe(4)
})

test('part one 2', () => {
  expect(solvePartOne(input2)).toBe(8)
})
