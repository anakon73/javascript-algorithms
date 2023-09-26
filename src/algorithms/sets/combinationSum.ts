/**
 * @param {number[]} candidates - candidate numbers we're picking from.
 * @param {number} remainingSum - remaining sum after adding candidates to currentCombination.
 * @param {number[][]} finalCombinations - resulting list of combinations.
 * @param {number[]} currentCombination - currently explored candidates.
 * @param {number} startFrom - index of the candidate to start further exploration from.
 * @return {number[][]}
 */
function combinationSumRecursive(
  candidates: number[],
  remainingSum: number,
  finalCombinations: number[][] = [],
  currentCombination: number[] = [],
  startFrom: number = 0,
): number[][] {
  if (remainingSum < 0) {
    return finalCombinations;
  }

  if (remainingSum === 0) {
    finalCombinations.push(currentCombination.slice());

    return finalCombinations;
  }

  for (let candidateIndex = startFrom; candidateIndex < candidates.length; candidateIndex += 1) {
    const currentCandidate = candidates[candidateIndex];

    currentCombination.push(currentCandidate);

    combinationSumRecursive(
      candidates,
      remainingSum - currentCandidate,
      finalCombinations,
      currentCombination,
      candidateIndex,
    );

    currentCombination.pop();
  }

  return finalCombinations;
}

export default function combinationSum(candidates: number[], target: number): number[][] {
  return combinationSumRecursive(candidates, target);
}