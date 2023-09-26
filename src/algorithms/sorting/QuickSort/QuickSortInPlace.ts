import Sort from '../Sort'

export default class QuickSortInPlace extends Sort {
  sort(
    originalArray: any[],
    inputLowIndex = 0,
    inputHighIndex = originalArray.length - 1,
    recursiveCall = false,
  ) {
    const array = recursiveCall ? originalArray : [...originalArray]

    const partitionArray = (lowIndex: number, highIndex: number): number => {
      const swap = (leftIndex: number, rightIndex: number) => {
        const temp = array[leftIndex]
        array[leftIndex] = array[rightIndex]
        array[rightIndex] = temp
      }

      const pivot = array[highIndex]

      this.callbacks.visitingCallback(pivot)

      let partitionIndex = lowIndex
      for (let currentIndex = lowIndex; currentIndex < highIndex; currentIndex++) {
        if (this.comparator.lessThan(array[currentIndex], pivot)) {
          swap(partitionIndex, currentIndex)
          partitionIndex++
        }
      }

      swap(partitionIndex, highIndex)

      return partitionIndex
    }

    if (inputLowIndex < inputHighIndex) {
      const partitionIndex = partitionArray(inputLowIndex, inputHighIndex)
      const RECURSIVE_CALL = true
      this.sort(array, inputLowIndex, partitionIndex - 1, RECURSIVE_CALL)
      this.sort(array, partitionIndex + 1, inputHighIndex - 1, RECURSIVE_CALL)
    }

    return array
  }
}