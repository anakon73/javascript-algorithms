export default function fibonacci(number: number): number[] {
  const fibSequence = [1]

  let currentValue = 1
  let previousValue = 0

  if (number === 1) {
    return fibSequence
  }

  let iterationsCount = number - 1

  while (iterationsCount) {
    currentValue += previousValue
    previousValue = currentValue - previousValue

    fibSequence.push(currentValue)

    iterationsCount -= 1
  }

  return fibSequence
}
