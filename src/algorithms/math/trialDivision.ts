export default function trialDivision(number: number): boolean {
  if (number % 1 !== 0) return false

  if (number <= 1) return false

  if (number <= 3) return true

  if (number % 2 === 0) return false

  const dividerLimit = Math.sqrt(number)
  for (let divider = 3; divider < dividerLimit; divider += 2) {
    if (number % divider === 0) return false
  }

  return true
}
