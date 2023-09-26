export default function recursiveStaircaseMEM(totalStairs: number): number {
  const memo: number[] = [];

  const getSteps = (stairsNum: number) => {
    if (stairsNum <= 0) {
      return 0;
    }

    if (stairsNum === 1) {
      return 1;
    }

    if (stairsNum === 2) {
      return 2;
    }

    if (memo[stairsNum]) {
      return memo[stairsNum];
    }

    memo[stairsNum] = getSteps(stairsNum - 1) + getSteps(stairsNum - 2);

    return memo[stairsNum];
  };

  return getSteps(totalStairs);
}