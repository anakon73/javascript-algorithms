import Comparator from "../../utils/comparator";

export default function linearSearch(array: any[], seekElement: any, comparatorCallback: (a: any, b: any) => any): number[] {
  const comparator = new Comparator(comparatorCallback);
  const foundIndices: number[] = [];

  array.forEach((element, index) => {
    if (comparator.equal(element, seekElement)) {
      foundIndices.push(index);
    }
  });

  return foundIndices;
}