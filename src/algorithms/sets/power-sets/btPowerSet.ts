function btPowerSetRecursive(originalSet: any[], allSubsets: any[] = [[]], currentSubSet: any[] = [], startAt = 0): any[][] {
  for (let position = startAt; position < originalSet.length; position += 1) {
    currentSubSet.push(originalSet[position])

    allSubsets.push([...currentSubSet])

    btPowerSetRecursive(originalSet, allSubsets, currentSubSet, position + 1)

    currentSubSet.pop()
  }

  return allSubsets
}

export default function btPowerSet(originalSet: any[]): any[][] {
  return btPowerSetRecursive(originalSet)
}
