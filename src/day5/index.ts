export function solvePartOne(input: string): number {
  const sections = input.slice(0, -1).split('\n\n')
  const seeds = sections[0].split(': ')[1].split(' ').map(Number)
  const locations: number[] = []
  const maps = sections.slice(1)

  seeds.forEach((seed) => {
    let mappedValue = seed
    maps.forEach((map) => {
      mappedValue = mapValue(mappedValue, map)
    })
    locations.push(mappedValue)
  })

  return Math.min(...locations)
}

function mapValue(value: number, map: string): number {
  for (const field of map.split('\n').slice(1)) {
    const [destination, source, range] = field.split(' ').map(Number)
    if (value >= source && value < source + range) {
      return destination + (value - source)
    }
  }
  return value
}

export function solvePartTwo(input: string): number {
  const sections = input.slice(0, -1).split('\n\n')
  const seeds = sections[0].split(': ')[1].split(' ').map(Number)
  let intervals: Interval[] = []
  for (let i = 0; i < seeds.length; i += 2) {
    intervals.push(new Interval({ start: seeds[i], range: seeds[i + 1] }))
  }
  const maps = sections.slice(1)

  maps.forEach((map) => {
    const mappedIntervals: Interval[] = []
    for (const field of map.split('\n').slice(1)) {
      const [destination, source, range] = field.split(' ').map(Number)
      const remainders: Interval[] = []
      intervals.forEach((interval) => {
        const overlap = getIntersection(new Interval({ start: source, range }), interval)
        if (overlap === null) {
          remainders.push(interval)
          return
        }
        mappedIntervals.push(new Interval({ start: destination + overlap.start - source, range: overlap.range }))
        remainders.push(...getDifference(interval, overlap))
      })
      intervals = [...remainders]
    }

    intervals.push(...mappedIntervals)
  })

  return Math.min(...intervals.map(({ start }) => start))
}

function getIntersection(a: Interval, b: Interval): Interval | null {
  if (a.start > b.end || b.start > a.end) {
    return null
  }
  const start = Math.max(a.start, b.start)
  const end = Math.min(a.end, b.end)
  return new Interval({ start, end })
}

function getDifference(minuend: Interval, subtrahend: Interval): Interval[] {
  const remainder: Interval[] = []
  if (subtrahend.start > minuend.start) {
    remainder.push(new Interval({ start: minuend.start, end: subtrahend.start - 1 }))
  }
  if (minuend.end > subtrahend.end) {
    remainder.push(new Interval({ start: subtrahend.end + 1, end: minuend.end }))
  }
  return remainder
}

class Interval {
  private _start: number
  get start() {
    return this._start
  }
  private _end: number
  get end() {
    return this._end
  }
  get range() {
    return this._end - this._start + 1
  }
  constructor(interval: { start: number; end: number } | { start: number; range: number }) {
    this._start = interval.start
    this._end = 'end' in interval ? interval.end : interval.start + interval.range - 1
  }
}

const input = await Bun.file('./src/day5/input.txt').text()
console.log('Part one: ', solvePartOne(input))
console.log('Part two: ', solvePartTwo(input))
