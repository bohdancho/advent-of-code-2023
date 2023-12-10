import { expect, test } from 'bun:test'
import { solvePartOne, solvePartTwo } from './index'

const inputOne1 = `.....
.S-7.
.|.|.
.L-J.
.....\n`

const inputOne2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...\n`

const inputTwo1 = `..........
.S------7.
.|F----7|.
.||OOOO||.
.||OOOO||.
.|L-7F-J|.
.|II||II|.
.L--JL--J.
..........`

test('part one 1', () => {
  expect(solvePartOne(inputOne1)).toBe(4)
})

test('part one 2', () => {
  expect(solvePartOne(inputOne2)).toBe(8)
})

test('part two 1', () => {
  expect(solvePartTwo(inputTwo1)).toBe(4)
})
