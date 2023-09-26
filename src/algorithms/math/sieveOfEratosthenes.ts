export default function sieveOfEratosthenes(maxNumber: number): number[] {
  const isPrime = new Array(maxNumber + 1).fill(true)
  isPrime[0] = false
  isPrime[1] = false

  const primes: number[] = []

  for (let number = 2; number < maxNumber; number++) {
    if (isPrime[number] === true) {
      primes.push(number)

      let nextNumber = number * number

      while (nextNumber <= maxNumber) {
        isPrime[nextNumber] = false
        nextNumber += number
      }
    }
  }

  return primes
}
