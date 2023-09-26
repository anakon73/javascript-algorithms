export default function recursiveStaircaseDP(stairsNum: number): number {
  if (stairsNum < 0) {
    return 0;
  }

  const steps = new Array(stairsNum + 1).fill(0);

  steps[0] = 0;
  steps[1] = 1;
  steps[2] = 2;

  if (stairsNum <= 2) {
    return steps[stairsNum];
  }

  for (let currentStep = 3; currentStep <= stairsNum; currentStep += 1) {
    steps[currentStep] = steps[currentStep - 1] + steps[currentStep - 2];
  }

  return steps[stairsNum];
}