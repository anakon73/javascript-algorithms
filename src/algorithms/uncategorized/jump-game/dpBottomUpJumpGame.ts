export default function dpBottomUpJumpGame(numbers: number[]): boolean {
  const cellsGoodness = Array(numbers.length).fill(undefined);
  cellsGoodness[cellsGoodness.length - 1] = true;

  for (let cellIndex = numbers.length - 2; cellIndex >= 0; cellIndex -= 1) {
    const maxJumpLength = Math.min(
      numbers[cellIndex],
      numbers.length - 1 - cellIndex,
    );

    for (let jumpLength = maxJumpLength; jumpLength > 0; jumpLength -= 1) {
      const nextIndex = cellIndex + jumpLength;
      if (cellsGoodness[nextIndex] === true) {
        cellsGoodness[cellIndex] = true;
        break;
      }
    }
  }

  return cellsGoodness[0] === true;
}