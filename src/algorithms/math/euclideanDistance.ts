import * as mtrx from './matrix'

const euclideanDistance = (a: mtrx.Matrix, b: mtrx.Matrix): number => {
  mtrx.validateSameShape(a, b);

  let squaresTotal = 0;

  mtrx.walk(a, (indices, aCellValue) => {
    const bCellValue = mtrx.getCellAtIndex(b, indices);
    squaresTotal += (aCellValue - bCellValue) ** 2;
  });

  return Number(Math.sqrt(squaresTotal).toFixed(2));
};

export default euclideanDistance;