export default function countSetBits(originalNumber: number): number {
  let setBitsCount = 0
  let number = originalNumber

  while (number) {
    setBitsCount += number & 1
    number >>>= 1
  }

  return setBitsCount
}