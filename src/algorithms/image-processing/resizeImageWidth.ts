type ImageSize = { w: number, h: number };
type Coordinate = { x: number, y: number };
type Seam = Coordinate[];
type EnergyMap = number[][];

type Color = [
  r: number,
  g: number,
  b: number,
  a: number,
] | Uint8ClampedArray;

export const getPixel = (img: ImageData, { x, y }: Coordinate): Color => {
  const i = y * img.width + x;
  const cellsPerColor = 4;
  return img.data.subarray(i * cellsPerColor, i * cellsPerColor + cellsPerColor);
};

/**
 * @param {ImageData} img
 * @param {PixelCoordinate} coordinate
 * @param {PixelColor} color
 */
export const setPixel = (img: ImageData, { x, y }: Coordinate, color: Color): void => {
  const i = y * img.width + x;
  const cellsPerColor = 4;
  img.data.set(color, i * cellsPerColor);
};
const matrix = <T>(w: number, h: number, filler: T): T[][] => {
  return new Array(h)
    .fill(null)
    .map(() => {
      return new Array(w).fill(filler);
    });
};

/**
 * Calculates the energy of a pixel.
 * @param {?PixelColor} left
 * @param {PixelColor} middle
 * @param {?PixelColor} right
 * @returns {number}
 */
const getPixelEnergy = (left: Color | null, middle: Color, right: Color | null): number => {
  const [mR, mG, mB] = middle;

  let lEnergy = 0;
  if (left) {
    const [lR, lG, lB] = left;
    lEnergy = (lR - mR) ** 2 + (lG - mG) ** 2 + (lB - mB) ** 2;
  }

  let rEnergy = 0;
  if (right) {
    const [rR, rG, rB] = right;
    rEnergy = (rR - mR) ** 2 + (rG - mG) ** 2 + (rB - mB) ** 2;
  }

  return Math.sqrt(lEnergy + rEnergy);
};

/**
 * Calculates the energy of each pixel of the image.
 * @param {ImageData} img
 * @param {ImageSize} size
 * @returns {EnergyMap}
 */
const calculateEnergyMap = (img: ImageData, { w, h }: ImageSize): EnergyMap => {
  const energyMap: EnergyMap = matrix(w, h, Infinity);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const left = (x - 1) >= 0 ? getPixel(img, { x: x - 1, y }) : null;
      const middle = getPixel(img, { x, y });
      const right = (x + 1) < w ? getPixel(img, { x: x + 1, y }) : null;
      energyMap[y][x] = getPixelEnergy(left, middle, right);
    }
  }
  return energyMap;
};

type SeamPixelMeta = {
  energy: number,
  coordinate: Coordinate,
  previous: Coordinate | null,
};

const findLowEnergySeam = (energyMap: EnergyMap, { w, h }: ImageSize): Seam => {
  const seamPixelsMap: (SeamPixelMeta | null)[][] = matrix(w, h, null);

  for (let x = 0; x < w; x += 1) {
    const y = 0;
    seamPixelsMap[y][x] = {
      energy: energyMap[y][x],
      coordinate: { x, y },
      previous: null,
    };
  }

  for (let y = 1; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      let minPrevEnergy = Infinity;
      let minPrevX = x;
      for (let i = (x - 1); i <= (x + 1); i += 1) {
        if (i >= 0 && i < w && seamPixelsMap[y - 1][i]!.energy < minPrevEnergy) {
          minPrevEnergy = seamPixelsMap[y - 1][i]!.energy;
          minPrevX = i;
        }
      }

      seamPixelsMap[y][x] = {
        energy: minPrevEnergy + energyMap[y][x],
        coordinate: { x, y },
        previous: { x: minPrevX, y: y - 1 },
      };
    }
  }

  let lastMinCoordinate: Coordinate = { x: 0, y: 0 };
  let minSeamEnergy = Infinity;
  for (let x = 0; x < w; x += 1) {
    const y = h - 1;
    if (seamPixelsMap[y][x]!.energy < minSeamEnergy) {
      minSeamEnergy = seamPixelsMap[y][x]!.energy;
      lastMinCoordinate = { x, y };
    }
  }

  const seam: Seam = [];

  const { x: lastMinX, y: lastMinY } = lastMinCoordinate;

  let currentSeam = seamPixelsMap[lastMinY][lastMinX];
  while (currentSeam) {
    seam.push(currentSeam.coordinate);
    const prevMinCoordinates = currentSeam.previous;
    if (!prevMinCoordinates) {
      currentSeam = null;
    } else {
      const { x: prevMinX, y: prevMinY } = prevMinCoordinates;
      currentSeam = seamPixelsMap[prevMinY][prevMinX];
    }
  }

  return seam;
};

const deleteSeam = (img: ImageData, seam: Seam, { w }: ImageSize) => {
  seam.forEach(({ x: seamX, y: seamY }) => {
    for (let x = seamX; x < (w - 1); x += 1) {
      const nextPixel = getPixel(img, { x: x + 1, y: seamY });
      setPixel(img, { x, y: seamY }, nextPixel);
    }
  });
};

type ResizeImageWidthArgs = {
  img: ImageData,
  toWidth: number,
};

type ResizeImageWidthResult = {
  img: ImageData,
  size: ImageSize,
};

const resizeImageWidth = ({ img, toWidth }: ResizeImageWidthArgs): ResizeImageWidthResult => {
  const size: ImageSize = { w: img.width, h: img.height };

  const pxToRemove = img.width - toWidth;

  let energyMap: EnergyMap | null = null;
  let seam: Seam | null = null;

  for (let i = 0; i < pxToRemove; i += 1) {
    energyMap = calculateEnergyMap(img, size);

    seam = findLowEnergySeam(energyMap, size);

    deleteSeam(img, seam, size);

    size.w -= 1;
  }

  return { img, size };
};

export default resizeImageWidth;