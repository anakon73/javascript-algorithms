export default function greedyJumpGame(numbers: number[]): boolean {
  let leftGoodPosition = numbers.length - 1;

  for (let numberIndex = numbers.length - 2; numberIndex >= 0; numberIndex -= 1) {
    const maxCurrentJumpLength = numberIndex + numbers[numberIndex];
    if (maxCurrentJumpLength >= leftGoodPosition) {
      leftGoodPosition = numberIndex;
    }
  }

  return leftGoodPosition === 0;
}