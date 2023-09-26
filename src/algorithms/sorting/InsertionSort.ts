import Sort from './Sort'

export default class InsertionSort extends Sort {
  comparator: any
  callbacks: any

  //@ts-ignore
  sort(originalArray: any[]): any[] {
    const array = [...originalArray];

    for (let i = 1; i < array.length; i += 1) {
      let currentIndex = i;

      this.callbacks.visitingCallback(array[i]);

      while (
        array[currentIndex - 1] !== undefined
        && this.comparator.lessThan(array[currentIndex], array[currentIndex - 1])
      ) {
        this.callbacks.visitingCallback(array[currentIndex - 1]);

        [
          array[currentIndex - 1],
          array[currentIndex],
        ] = [
            array[currentIndex],
            array[currentIndex - 1],
          ];

        currentIndex -= 1;
      }
    }

    return array;
  }
}