export default function hornerMethod(coefficients: number[], xVal: number): number {
  return coefficients.reduce(
    (accumulator, currentCoefficient) => {
      return accumulator * xVal + currentCoefficient;
    },
    0,
  );
}