import Sort from './Sort'
import { MinHeap } from '../../data-structures/Heap'

export default class HeapSort extends Sort {
  sort(originalArray: number[]): number[] {
    const sortedArray: number[] = []
    const minHeap = new MinHeap(this.callbacks.compareCallback)

    originalArray.forEach((element) => {
      this.callbacks.visitingCallback(element);

      minHeap.push(element);
    });

    while (!minHeap.isEmpty()) {
      const nextMinElement = minHeap.poll();

      this.callbacks.visitingCallback(nextMinElement);

      sortedArray.push(nextMinElement);
    }

    return sortedArray;
  }
}