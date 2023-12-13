import { expect, test } from 'bun:test'
import { solvePartOne, solvePartTwo } from './index'

const inputOneA = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)\n`

const inputOneB = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)\n`

const inputTwo = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)\n`

test('part one 1', () => {
  expect(solvePartOne(inputOneA)).toBe(2)
})

test('part one 2', () => {
  expect(solvePartOne(inputOneB)).toBe(6)
})

test('part two', () => {
  expect(solvePartTwo(inputTwo)).toBe(6)
})
