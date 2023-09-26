export default function recursiveStaircaseIT(stairsNum: number): number {
  if (stairsNum <= 0) {
    return 0;
  }

  const steps = [1, 2];

  if (stairsNum <= 2) {
    return steps[stairsNum - 1];
  }

  for (let currentStep = 3; currentStep <= stairsNum; currentStep += 1) {
    [steps[0], steps[1]] = [steps[1], steps[0] + steps[1]];
  }

  return steps[1];
}