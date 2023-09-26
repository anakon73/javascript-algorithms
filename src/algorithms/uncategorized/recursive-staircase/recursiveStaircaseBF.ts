export default function recursiveStaircaseBF(stairsNum: number): number {
  if (stairsNum <= 0) {
    return 0;
  }

  if (stairsNum === 1) {
    return 1;
  }

  if (stairsNum === 2) {
    return 2;
  }

  return recursiveStaircaseBF(stairsNum - 1) + recursiveStaircaseBF(stairsNum - 2);
}