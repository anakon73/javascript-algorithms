import multiplyByTwo from './multiplyByTwo'
import divideByTwo from './divideByTwo'
import isEven from './isEven'
import isPositive from './isPositive'

export default function multiply(a: number, b: number): number {
  if (b === 0 || a === 0) return 0

  const multiplyByOddPositive = () => multiply(multiplyByTwo(a), divideByTwo(b - 1)) + a;
  const multiplyByOddNegative = () => multiply(multiplyByTwo(a), divideByTwo(b + 1)) - a;

  const multiplyByEven = () => multiply(multiplyByTwo(a), divideByTwo(b));
  const multiplyByOdd = () => (isPositive(b) ? multiplyByOddPositive() : multiplyByOddNegative());

  return isEven(b) ? multiplyByEven() : multiplyByOdd();
}
