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
      handleFirstIndex(line.indexOf(digitWord))
      handleFirstIndex(line.indexOf(digitNum))
      handleLastIndex(line.lastIndexOf(digitWord))
      handleLastIndex(line.lastIndexOf(digitNum))

      function handleFirstIndex(index: number) {
        if (index !== -1) {
          if (firstDigit.index === undefined || index < firstDigit.index) {
            firstDigit.index = index
            firstDigit.value = digitNum
          }
        }
      }

      function handleLastIndex(index: number) {
        if (index !== -1) {
          if (lastDigit.index === undefined || index > lastDigit.index) {
            lastDigit.index = index
            lastDigit.value = digitNum
          }
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
