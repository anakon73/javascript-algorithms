export default function bfMaximumSubarray(inputArray: number[]): number[] {
  let maxSubarrayStartIndex = 0
  let maxSubarrayLength = 0
  let maxSubarraySum = 0

  for (let startIndex = 0; startIndex < inputArray.length; startIndex += 1) {
    let subarraySum = 0
    for (let arrLength = 1; arrLength <= (inputArray.length - startIndex); arrLength += 1) {
      subarraySum += inputArray[startIndex + (arrLength - 1)]
      if (maxSubarraySum === null || subarraySum > maxSubarraySum) {
        maxSubarraySum = subarraySum
        maxSubarrayStartIndex = startIndex
        maxSubarrayLength = arrLength
      }
    }
  }

  return inputArray.slice(maxSubarrayStartIndex, maxSubarrayStartIndex + maxSubarrayLength)
}