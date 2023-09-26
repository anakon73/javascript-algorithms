import QueenPosition from './QueenPosition';

function isSafe(queensPositions: QueenPosition[], rowIndex: number, columnIndex: number): boolean {
  const newQueenPosition = new QueenPosition(rowIndex, columnIndex);

  for (let queenIndex = 0; queenIndex < queensPositions.length; queenIndex += 1) {
    const currentQueenPosition = queensPositions[queenIndex];

    if (
      currentQueenPosition
      && (
        newQueenPosition.columnIndex === currentQueenPosition.columnIndex
        || newQueenPosition.rowIndex === currentQueenPosition.rowIndex
        || newQueenPosition.leftDiagonal === currentQueenPosition.leftDiagonal
        || newQueenPosition.rightDiagonal === currentQueenPosition.rightDiagonal
      )
    ) {
      return false;
    }
  }

  return true;
}

function nQueensRecursive(
  solutions: QueenPosition[][],
  previousQueensPositions: QueenPosition[],
  queensCount: number,
  rowIndex: number
): boolean {
  const queensPositions: QueenPosition[] = [...previousQueensPositions].map((queenPosition) => {
    return !queenPosition ? queenPosition : new QueenPosition(
      queenPosition.rowIndex,
      queenPosition.columnIndex,
    );
  });

  if (rowIndex === queensCount) {
    solutions.push(queensPositions);

    return true;
  }

  for (let columnIndex = 0; columnIndex < queensCount; columnIndex += 1) {
    if (isSafe(queensPositions, rowIndex, columnIndex)) {
      queensPositions[rowIndex] = new QueenPosition(rowIndex, columnIndex);

      nQueensRecursive(solutions, queensPositions, queensCount, rowIndex + 1);


      // @ts-ignore
      queensPositions[rowIndex] = null;
    }
  }

  return false;
}

export default function nQueens(queensCount: number): QueenPosition[][] {

  const queensPositions = Array(queensCount).fill(null);

  /** @var {QueenPosition[][]} solutions */
  const solutions: QueenPosition[][] = [];

  nQueensRecursive(solutions, queensPositions, queensCount, 0);

  return solutions;
}
