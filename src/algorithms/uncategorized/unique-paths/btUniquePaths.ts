export default function btUniquePaths(
  width: number,
  height: number,
  steps: number[][] = [[0, 0]],
  uniqueSteps: number = 0
): number {
  const currentPos = steps[steps.length - 1];

  if (currentPos[0] === width - 1 && currentPos[1] === height - 1) {
    return uniqueSteps + 1;
  }

  let rightUniqueSteps = 0;
  let downUniqueSteps = 0;

  if (currentPos[0] < width - 1) {
    steps.push([
      currentPos[0] + 1,
      currentPos[1],
    ]);

    rightUniqueSteps = btUniquePaths(width, height, steps, uniqueSteps);

    steps.pop();
  }

  if (currentPos[1] < height - 1) {
    steps.push([
      currentPos[0],
      currentPos[1] + 1,
    ]);

    downUniqueSteps = btUniquePaths(width, height, steps, uniqueSteps);

    steps.pop();
  }

  return rightUniqueSteps + downUniqueSteps;
}