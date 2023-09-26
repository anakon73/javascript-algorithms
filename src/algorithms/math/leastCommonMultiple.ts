import euclideanAlgorithm from './euclidean/euclideanAlgorithm'

export default function leastCommonMultiple(a: number, b: number): number {
  return ((a === 0) || (b === 0)) ? 0 : Math.abs(a * b) / euclideanAlgorithm(a, b);
}
