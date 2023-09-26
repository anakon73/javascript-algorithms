export default function permutateWithoutRepetitions(permutationOptions: any[]): any[] {
  if (permutationOptions.length === 1) {
    return [permutationOptions]
  }

  const permutations: any[] = []

  const smallerPermutations = permutateWithoutRepetitions(permutationOptions.slice(1))

  const firstOption = permutationOptions[0]

  for (let permIndex = 0; permIndex < smallerPermutations.length; permIndex += 1) {
    const smallerPermutation = smallerPermutations[permIndex]

    for (let positionIndex = 0; positionIndex <= smallerPermutation.length; positionIndex += 1) {
      const permutationPrefix = smallerPermutation.slice(0, positionIndex)
      const permutationSuffix = smallerPermutation.slice(positionIndex)
      permutations.push(permutationPrefix.concat([firstOption], permutationSuffix))
    }
  }

  return permutations;
}