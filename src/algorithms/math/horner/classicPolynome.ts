export default function classicPolynome(coefficients: number[], xVal: number): number {
  return coefficients.reverse().reduce(
    (accumulator, currentCoefficient, index) => {
      return accumulator + currentCoefficient * (xVal ** index)
    },
    0,
  );
}