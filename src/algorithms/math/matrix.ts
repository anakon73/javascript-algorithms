export type Cell = number
export type Matrix = Cell[][] | Cell[][][]
export type Shape = number[]
export type CellIndices = number[]


/**
 * Gets the matrix's shape.
 *
 * @param {Matrix} m
 * @returns {Shape}
 */
export const shape = (m: Matrix): Shape => {
  const shapes: Shape = [];
  let dimension: any = m;
  while (dimension && Array.isArray(dimension)) {
    shapes.push(dimension.length);
    dimension = (dimension.length && [...dimension][0]) || null;
  }
  return shapes;
};

const validateType = (m: Matrix) => {
  if (
    !m
    || !Array.isArray(m)
    || !Array.isArray(m[0])
  ) {
    throw new Error('Invalid matrix format');
  }
};

const validate2D = (m: Matrix) => {
  validateType(m);
  const aShape = shape(m);
  if (aShape.length !== 2) {
    throw new Error('Matrix is not of 2D shape');
  }
};

export const validateSameShape = (a: Matrix, b: Matrix) => {
  validateType(a);
  validateType(b);

  const aShape = shape(a);
  const bShape = shape(b);

  if (aShape.length !== bShape.length) {
    throw new Error('Matrices have different dimensions');
  }

  while (aShape.length && bShape.length) {
    if (aShape.pop() !== bShape.pop()) {
      throw new Error('Matrices have different shapes');
    }
  }
};

/**
 * @param {Shape} mShape - the shape of the matrix to generate
 * @param {function({CellIndex}): Cell} fill - cell values of a generated matrix.
 * @returns {Matrix}
 */
export const generate = (mShape: Shape, fill: (cellIndex: number) => Cell): Matrix => {
  const generateRecursively = (recShape: Shape, recIndices: CellIndices): Matrix => {
    if (recShape.length === 1) {
      //@ts-ignore
      return Array(recShape[0])
        .fill(null)
        //@ts-ignore
        .map((cellValue, cellIndex) => fill([...recIndices, cellIndex]));
    }
    const m: Matrix = [];
    for (let i = 0; i < recShape[0]; i += 1) {
      //@ts-ignore
      m.push(generateRecursively(recShape.slice(1), [...recIndices, i]));
    }
    return m;
  };

  return generateRecursively(mShape, []);
};

/**
 *
 * @param {Shape} mShape - shape of the matrix
 * @returns {Matrix}
 */
export const zeros = (mShape) => {
  return generate(mShape, () => 0);
};

/**
 * @param {Matrix} a
 * @param {Matrix} b
 * @return Matrix
 * @throws {Error}
 */
export const dot = (a: Matrix, b: Matrix): Matrix => {
  validate2D(a);
  validate2D(b);

  const aShape = shape(a);
  const bShape = shape(b);
  if (aShape[1] !== bShape[0]) {
    throw new Error('Matrices have incompatible shape for multiplication');
  }

  const outputShape = [aShape[0], bShape[1]];
  const c = zeros(outputShape);

  for (let bCol = 0; bCol < b[0].length; bCol += 1) {
    for (let aRow = 0; aRow < a.length; aRow += 1) {
      let cellSum = 0;
      for (let aCol = 0; aCol < a[aRow].length; aCol += 1) {
        // @ts-ignore
        cellSum += a[aRow][aCol] * b[aCol][bCol];
      }
      c[aRow][bCol] = cellSum;
    }
  }

  return c;
};

export const t = (m: Matrix): Matrix => {
  validate2D(m);
  const mShape = shape(m);
  const transposed = zeros([mShape[1], mShape[0]]);
  for (let row = 0; row < m.length; row += 1) {
    for (let col = 0; col < m[0].length; col += 1) {
      transposed[col][row] = m[row][col];
    }
  }
  return transposed;
};

export const walk = (m: Matrix, visit: (indices: CellIndices, c: Cell) => void) => {
  const recWalk = (recM: Matrix, cellIndices: CellIndices) => {
    const recMShape = shape(recM);

    if (recMShape.length === 1) {
      for (let i = 0; i < recM.length; i += 1) {
        //@ts-ignore
        visit([...cellIndices, i], recM[i]);
      }
    }
    for (let i = 0; i < recM.length; i += 1) {
      //@ts-ignore
      recWalk(recM[i], [...cellIndices, i]);
    }
  };

  recWalk(m, []);
};

export const getCellAtIndex = (m: Matrix, cellIndices: CellIndices): Cell => {
  let cell: number = cellIndices[0];
  for (let dimIdx = 1; dimIdx < cellIndices.length - 1; dimIdx += 1) {
    cell = cell[cellIndices[dimIdx]];
  }
  return cell[cellIndices[cellIndices.length - 1]];
};

export const updateCellAtIndex = (m: Matrix, cellIndices: CellIndices, cellValue: Cell) => {
  let cell = m[cellIndices[0]];
  for (let dimIdx = 1; dimIdx < cellIndices.length - 1; dimIdx += 1) {
    // @ts-ignore
    cell = cell[cellIndices[dimIdx]];
  }
  cell[cellIndices[cellIndices.length - 1]] = cellValue;
};

export const add = (a: Matrix, b: Matrix): Matrix => {
  validateSameShape(a, b);
  const result = zeros(shape(a));

  walk(a, (cellIndices, cellValue) => {
    updateCellAtIndex(result, cellIndices, cellValue);
  });

  walk(b, (cellIndices, cellValue) => {
    const currentCellValue = getCellAtIndex(result, cellIndices);
    updateCellAtIndex(result, cellIndices, currentCellValue + cellValue);
  });

  return result;
};

export const mul = (a: Matrix, b: Matrix): Matrix => {
  validateSameShape(a, b);
  const result = zeros(shape(a));

  walk(a, (cellIndices, cellValue) => {
    updateCellAtIndex(result, cellIndices, cellValue);
  });

  walk(b, (cellIndices, cellValue) => {
    const currentCellValue = getCellAtIndex(result, cellIndices);
    updateCellAtIndex(result, cellIndices, currentCellValue * cellValue);
  });

  return result;
};

export const sub = (a: Matrix, b: Matrix): Matrix => {
  validateSameShape(a, b);
  const result = zeros(shape(a));

  walk(a, (cellIndices, cellValue) => {
    updateCellAtIndex(result, cellIndices, cellValue);
  });

  walk(b, (cellIndices, cellValue) => {
    const currentCellValue = getCellAtIndex(result, cellIndices);
    updateCellAtIndex(result, cellIndices, currentCellValue - cellValue);
  });

  return result;
};