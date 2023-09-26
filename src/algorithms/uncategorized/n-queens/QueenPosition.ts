export default class QueenPosition {
  rowIndex: number
  columnIndex: number
  constructor(rowIndex: number, columnIndex: number) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
  }

  get leftDiagonal(): number {
    return this.rowIndex - this.columnIndex;
  }

  get rightDiagonal(): number {
    return this.rowIndex + this.columnIndex;
  }

  toString() {
    return `${this.rowIndex},${this.columnIndex}`;
  }
}