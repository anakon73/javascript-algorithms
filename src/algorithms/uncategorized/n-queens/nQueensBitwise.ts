function nQueensBitwiseRecursive(
  boardSize: number,
  leftDiagonal: number = 0,
  column: number = 0,
  rightDiagonal: number = 0,
  solutionsCount: number = 0,
): number {
  let currentSolutionsCount = solutionsCount;

  const isDone = (2 ** boardSize) - 1;

  if (column === isDone) {
    return currentSolutionsCount + 1;
  }

  let availablePositions = ~(leftDiagonal | rightDiagonal | column);

  while (availablePositions & isDone) {
    const firstAvailablePosition = availablePositions & -availablePositions;

    availablePositions -= firstAvailablePosition;

    currentSolutionsCount += nQueensBitwiseRecursive(
      boardSize,
      (leftDiagonal | firstAvailablePosition) >> 1,
      column | firstAvailablePosition,
      (rightDiagonal | firstAvailablePosition) << 1,
      solutionsCount,
    );
  }

  return currentSolutionsCount;
}

export default function nQueensBitwise(boardSize: number): number {
  return nQueensBitwiseRecursive(boardSize);
}
