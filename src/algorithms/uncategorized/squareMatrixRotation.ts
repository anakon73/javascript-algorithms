export default function squareMatrixRotation(originalMatrix: any[][]): any[][] {
  const matrix = originalMatrix.slice();

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex += 1) {
    for (let columnIndex = rowIndex + 1; columnIndex < matrix.length; columnIndex += 1) {
      [
        matrix[columnIndex][rowIndex],
        matrix[rowIndex][columnIndex],
      ] = [
          matrix[rowIndex][columnIndex],
          matrix[columnIndex][rowIndex],
        ];
    }
  }

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < matrix.length / 2; columnIndex += 1) {
      [
        matrix[rowIndex][matrix.length - columnIndex - 1],
        matrix[rowIndex][columnIndex],
      ] = [
          matrix[rowIndex][columnIndex],
          matrix[rowIndex][matrix.length - columnIndex - 1],
        ];
    }
  }

  return matrix;
}