const SEPARATOR = '$'

function buildZArray(zString: string): number[] {
  const zArray = new Array(zString.length).fill(null).map(() => 0)

  let zBoxLeftIndex = 0
  let zBoxRightIndex = 0

  let zBoxShift = 0

  for (let charIndex = 1; charIndex < zString.length; charIndex += 1) {
    if (charIndex > zBoxRightIndex) {

      zBoxLeftIndex = charIndex
      zBoxRightIndex = charIndex

      while (
        zBoxRightIndex < zString.length
        && zString[zBoxRightIndex - zBoxLeftIndex] === zString[zBoxRightIndex]
      ) {
        zBoxRightIndex += 1
      }

      zArray[charIndex] = zBoxRightIndex - zBoxLeftIndex

      zBoxRightIndex -= 1
    } else {

      zBoxShift = charIndex - zBoxLeftIndex

      if (zArray[zBoxShift] < (zBoxRightIndex - charIndex) + 1) {
        zArray[charIndex] = zArray[zBoxShift]
      } else {
        zBoxLeftIndex = charIndex
        while (
          zBoxRightIndex < zString.length
          && zString[zBoxRightIndex - zBoxLeftIndex] === zString[zBoxRightIndex]
        ) {
          zBoxRightIndex += 1
        }

        zArray[charIndex] = zBoxRightIndex - zBoxLeftIndex

        zBoxRightIndex -= 1
      }
    }
  }

  return zArray
}

export default function zAlgorithm(text: string, word: string): number[] {
  const wordPositions: number[] = []

  const zString = `${word}${SEPARATOR}${text}`

  const zArray = buildZArray(zString)

  for (let charIndex = 1; charIndex < zArray.length; charIndex += 1) {
    if (zArray[charIndex] === word.length) {
      const wordPosition = charIndex - word.length - SEPARATOR.length
      wordPositions.push(wordPosition)
    }
  }

  return wordPositions
}