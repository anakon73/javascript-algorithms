export default function isPositive(number: number): boolean {
  if (number === 0) return false

  return ((number >> 31) & 1) === 0
}