export default function fastPowering(base: number, power: number): number {
  if (power === 0) return 1

  if (power % 2 === 0) {
    const multiplier = fastPowering(base, power / 2)
    return multiplier * multiplier
  }

  const multiplier = fastPowering(base, Math.floor(power / 2))
  return multiplier * multiplier * base
}