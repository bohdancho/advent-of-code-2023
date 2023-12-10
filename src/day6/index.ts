export function solvePartOne(input: string): number {
  const [times, distances] = input.split('\n').map((line) =>
    line
      .split(' ')
      .slice(1)
      .filter((v) => v !== '')
      .map(Number),
  )
  let ans = 1
  times.forEach((time, i) => {
    let options = 0
    for (let charge = 1; charge < time; charge++) {
      if ((time - charge) * charge > distances[i]) {
        options++
      }
    }
    ans *= options
  })
  return ans
}

// export function solvePartTwo(input: string): number {
//   const [time, distance] = input
//     .slice(0, -1)
//     .split('\n')
//     .map((line) => line.split(': ')[1].replaceAll(' ', ''))
//     .map(Number)
//
//   let ans = 0
//   for (let charge = 1; charge < time; charge++) {
//     if ((time - charge) * charge > distance) {
//       ans++
//     }
//   }
//   return ans
// }

export function solvePartTwo(input: string): number {
  const [time, distance] = input
    .slice(0, -1)
    .split('\n')
    .map((line) => line.split(': ')[1].replaceAll(' ', ''))
    .map(Number)

  const min = (time - Math.sqrt(time ** 2 - 4 * distance)) / 2
  const max = (time + Math.sqrt(time ** 2 - 4 * distance)) / 2

  return Math.floor(max) - Math.ceil(min) + 1
}

const input = await Bun.file('./src/day6/input.txt').text()
console.log('Part one: ', solvePartOne(input))
console.log('Part two: ', solvePartTwo(input))
