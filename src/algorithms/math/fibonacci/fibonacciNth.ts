export default function fibonacciNth(number: number): number {
  let currentValue = 1
  let previousValue = 0

  if (number === 1) {
    return 1
  }

  let iterationsCount = number - 1

  while (iterationsCount) {
    currentValue += previousValue
    previousValue = currentValue - previousValue

    iterationsCount -= 1
  }

  return currentValue
}