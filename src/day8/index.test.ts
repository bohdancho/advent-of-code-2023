import { expect, test } from 'bun:test'
import { solvePartOne } from './index'

const input1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)\n`

const input2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)\n`

test('part one 1', () => {
  expect(solvePartOne(input1)).toBe(2)
})

test('part one 2', () => {
  expect(solvePartOne(input2)).toBe(6)
})
