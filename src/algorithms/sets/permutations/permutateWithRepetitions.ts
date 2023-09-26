export default function permutateWithRepetitions(
  permutationOptions: any[],
  permutationLength = permutationOptions.length,
): any[] {
  if (permutationLength === 1) {
    return permutationOptions.map((permutationOption) => [permutationOption])
  }

  const permutations: any[] = []

  const smallerPermutations = permutateWithRepetitions(
    permutationOptions,
    permutationLength - 1,
  )

  permutationOptions.forEach((currentOption) => {
    smallerPermutations.forEach((smallerPermutation) => {
      permutations.push([currentOption].concat(smallerPermutation))
    })
  })

  return permutations
}