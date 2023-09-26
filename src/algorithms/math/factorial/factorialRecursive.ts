export default function factorialRecursive(number: number): number {
  return number > 1 ? factorialRecursive(number - 1) : 1
}