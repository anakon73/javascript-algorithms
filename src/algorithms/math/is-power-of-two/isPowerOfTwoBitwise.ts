export default function isPowerOfTwoBitwise(number: number): boolean {
  if (number < 1) return false

  return (number & (number - 1)) === 0;
}