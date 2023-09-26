import Sort from './Sort'

export default class MergeSort extends Sort {
  sort(originalArray: any[]): any[] {
    this.callbacks.visitingCallback(null)

    if (originalArray.length <= 1) {
      return originalArray
    }

    const middleIndex = Math.floor(originalArray.length / 2)
    const leftArray = originalArray.slice(0, middleIndex)
    const rightArray = originalArray.slice(middleIndex, originalArray.length)

    const leftSortedArray = this.sort(leftArray)
    const rightSortedArray = this.sort(rightArray)

    return this.mergeSortedArrays(leftSortedArray, rightSortedArray)
  }

  mergeSortedArrays(leftArray: any[], rightArray: any[]): any[] {
    const sortedArray: any[] = []

    let leftIndex = 0
    let rightIndex = 0

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      let minElement

      if (this.comparator.lessThanOrEqual(leftArray[leftIndex], rightArray[rightIndex])) {
        minElement = leftArray[leftIndex]

        leftIndex++
      } else {
        minElement = rightArray[rightIndex]

        rightIndex++
      }

      sortedArray.push(minElement)

      this.callbacks.visitingCallback(minElement)
    }

    return sortedArray
      .concat(leftArray.slice(leftIndex))
      .concat(rightArray.slice(rightIndex))
  }
}