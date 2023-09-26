export default function dcMaximumSubarraySum(inputArray: number[]): number[] | number {
  function solveRecursively(elementIndex: number, mustPick: boolean): number {
    if (elementIndex >= inputArray.length) {
      return mustPick ? 0 : -Infinity
    }
    return Math.max(
      inputArray[elementIndex] + solveRecursively(elementIndex + 1, true),
      mustPick ? 0 : solveRecursively(elementIndex + 1, false),
    );
  }
  return solveRecursively(0, false)
}
