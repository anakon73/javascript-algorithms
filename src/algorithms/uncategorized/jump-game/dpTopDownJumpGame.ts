export default function dpTopDownJumpGame(
  numbers: number[],
  startIndex: number = 0,
  currentJumps: number[] = [],
  cellsGoodness: (boolean | undefined)[] = [],
): boolean {
  if (startIndex === numbers.length - 1) {
    return true;
  }

  const currentCellsGoodness: (boolean | undefined)[] = [...cellsGoodness];
  if (!currentCellsGoodness.length) {
    numbers.forEach(() => currentCellsGoodness.push(undefined));
    currentCellsGoodness[cellsGoodness.length - 1] = true;
  }

  const maxJumpLength = Math.min(
    numbers[startIndex],
    numbers.length - 1 - startIndex,
  );

  for (let jumpLength = maxJumpLength; jumpLength > 0; jumpLength -= 1) {
    const nextIndex = startIndex + jumpLength;

    if (currentCellsGoodness[nextIndex] !== false) {
      currentJumps.push(nextIndex);

      const isJumpSuccessful = dpTopDownJumpGame(
        numbers,
        nextIndex,
        currentJumps,
        currentCellsGoodness,
      );

      if (isJumpSuccessful) {
        return true;
      }

      currentJumps.pop();

      currentCellsGoodness[nextIndex] = false;
    }
  }

  return false;
}