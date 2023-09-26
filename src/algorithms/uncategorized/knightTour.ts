function getPossibleMoves(chessboard: number[][], position: number[]): number[][] {
  const possibleMoves = [
    [position[0] - 1, position[1] - 2],
    [position[0] - 2, position[1] - 1],
    [position[0] + 1, position[1] - 2],
    [position[0] + 2, position[1] - 1],
    [position[0] - 2, position[1] + 1],
    [position[0] - 1, position[1] + 2],
    [position[0] + 1, position[1] + 2],
    [position[0] + 2, position[1] + 1],
  ];

  return possibleMoves.filter((move) => {
    const boardSize = chessboard.length;
    return move[0] >= 0 && move[1] >= 0 && move[0] < boardSize && move[1] < boardSize;
  });
}
function isMoveAllowed(chessboard: number[][], move: number[]): boolean {
  return chessboard[move[0]][move[1]] !== 1;
}

function isBoardCompletelyVisited(chessboard: number[][], moves: number[][]) {
  const totalPossibleMovesCount = chessboard.length ** 2;
  const existingMovesCount = moves.length;

  return totalPossibleMovesCount === existingMovesCount;
}

function knightTourRecursive(chessboard: number[][], moves: number[][]): boolean {
  const currentChessboard = chessboard;

  if (isBoardCompletelyVisited(currentChessboard, moves)) {
    return true;
  }

  const lastMove = moves[moves.length - 1];
  const possibleMoves = getPossibleMoves(currentChessboard, lastMove);

  for (let moveIndex = 0; moveIndex < possibleMoves.length; moveIndex += 1) {
    const currentMove = possibleMoves[moveIndex];

    if (isMoveAllowed(currentChessboard, currentMove)) {
      moves.push(currentMove);
      currentChessboard[currentMove[0]][currentMove[1]] = 1;

      if (knightTourRecursive(currentChessboard, moves)) {
        return true;
      }

      moves.pop();
      currentChessboard[currentMove[0]][currentMove[1]] = 0;
    }
  }

  return false;
}

export default function knightTour(chessboardSize: number): number[][] {
  const chessboard = Array(chessboardSize).fill(null).map(() => Array(chessboardSize).fill(0));

  const moves: number[][] = [];

  const firstMove = [0, 0];
  moves.push(firstMove);
  chessboard[firstMove[0]][firstMove[0]] = 1;

  const solutionWasFound = knightTourRecursive(chessboard, moves);

  return solutionWasFound ? moves : [];
}