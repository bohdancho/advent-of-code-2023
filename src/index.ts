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
    const digits: { [place in 0 | 1]: Digit } = { 0: {}, 1: {} }

    Object.entries(digitStringsDictionary).forEach(([digitWord, digitNumber]) => {
      handleString(digitWord, 0)
      handleString(digitNumber, 0)
      handleString(digitWord, 1)
      handleString(digitNumber, 1)

      function handleString(string: string, digitPlace: 0 | 1) {
        const index = digitPlace === 0 ? line.indexOf(string) : line.lastIndexOf(string)
        if (index === -1) return

        const digit = digits[digitPlace]
        if (digit.index === undefined || (digitPlace === 0 ? index < digit.index : index > digit.index)) {
          digit.index = index
          digit.value = digitNumber
        }
      }
    })

    const lineSum = Number(`${digits[0].value}${digits[1].value}`)
    return accumulator + lineSum
  }, 0)
}

const fileInput = await Bun.file('./src/input.txt').text()
console.log(solvePartOne(fileInput))
console.log(solvePartTwo(fileInput))

export {}
