function solvePartOne(input: string) {
  const lines = input.split('\n').slice(0, -1)
  return lines.reduce((accumulator, line) => {
    const lineArr = line.split('')

    const firstDigit = lineArr.find((char) => !isNaN(Number(char)))
    const secondDigit = lineArr.findLast((char) => !isNaN(Number(char)))

    return accumulator + Number(`${firstDigit}${secondDigit}`)
  }, 0)
}

const digitStringsDictionary = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
} as const

function solvePartTwo(input: string) {
  const lines = input.split('\n').slice(0, -1)
  return lines.reduce((accumulator, line) => {
    type Digit = { value?: string; index?: number }
    const firstDigit: Digit = {}
    const lastDigit: Digit = {}

    Object.entries(digitStringsDictionary).forEach(([digitWord, digitNum]) => {
      const wordFirstIndex = line.indexOf(digitWord)
      const numFirstIndex = line.indexOf(digitNum)
      const wordLastIndex = line.lastIndexOf(digitWord)
      const numLastIndex = line.lastIndexOf(digitNum)

      if (wordFirstIndex !== -1) {
        if (firstDigit.index === undefined || wordFirstIndex < firstDigit.index) {
          firstDigit.index = wordFirstIndex
          firstDigit.value = digitNum
        }
      }
      if (numFirstIndex !== -1) {
        if (firstDigit.index === undefined || numFirstIndex < firstDigit.index) {
          firstDigit.index = numFirstIndex
          firstDigit.value = digitNum
        }
      }
      if (wordLastIndex !== -1) {
        if (lastDigit.index === undefined || wordLastIndex > lastDigit.index) {
          lastDigit.index = wordLastIndex
          lastDigit.value = digitNum
        }
      }
      if (numLastIndex !== -1) {
        if (lastDigit.index === undefined || numLastIndex > lastDigit.index) {
          lastDigit.index = numLastIndex
          lastDigit.value = digitNum
        }
      }
    })

    const lineSum = Number(`${firstDigit.value}${lastDigit.value}`)
    return accumulator + lineSum
  }, 0)
}

const fileInput = await Bun.file('./src/input.txt').text()
console.log(solvePartOne(fileInput))
console.log(solvePartTwo(fileInput))

export {}
