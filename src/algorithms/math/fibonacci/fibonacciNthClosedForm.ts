export default function fibonacciClosedForm(position: number): number {
  const topMaxValidPosition = 70

  if (position < 1 || position > topMaxValidPosition) {
    throw new Error(`Can't handle position smaller than 1 or greater than ${topMaxValidPosition}`)
  }

  const sqrt5 = Math.sqrt(5)

  const phi = (1 + sqrt5) / 2

  return Math.floor((phi ** position) / sqrt5 + 0.5)
}
