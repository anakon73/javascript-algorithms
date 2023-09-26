export default function euclideanAlgorithmIterative(originalA: number, originalB: number): number {
  let a = Math.abs(originalA)
  let b = Math.abs(originalB)

  while (a && b && a !== b) [a, b] = a > b ? [a - b, b] : [a, b - a]

  return a || b
}