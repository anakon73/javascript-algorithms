const circleRadius = 1

function getNGonSideLength(sideLength: number, splitCounter: number): number {
  if (splitCounter <= 0) return sideLength

  const halfSide = sideLength / 2

  const perpendicular = Math.sqrt((circleRadius ** 2) - (halfSide ** 2))
  const excessRadius = circleRadius - perpendicular
  const splitSideLength = Math.sqrt((excessRadius ** 2) + (halfSide ** 2))

  return getNGonSideLength(splitSideLength, splitCounter - 1);
}

function getNGonSideCount(splitCount: number): number {
  const hexagonSidesCount = 6
  return hexagonSidesCount * (splitCount ? 2 ** splitCount : 1)
}

export default function liuHui(splitCount = 1): number {
  const nGonSideLength = getNGonSideLength(circleRadius, splitCount - 1)
  const nGonSideCount = getNGonSideCount(splitCount - 1)
  const nGonPerimeter = nGonSideLength * nGonSideCount
  const approximateCircleArea = (nGonPerimeter / 2) * circleRadius

  return approximateCircleArea / (circleRadius ** 2)
}