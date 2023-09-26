export default function primeFactors(n: number): number[] {
  let nn = n

  const factors: number[] = []

  for (let factor = 2; factor <= Math.sqrt(nn); factor += 1) {
    while (nn % factor === 0) {
      nn /= factor
      factors.push(factor)
    }
  }

  if (nn !== 1) {
    factors.push(nn)
  }

  return factors
}

export function hardyRamanujan(n: number): number {
  return Math.log(n)
}
