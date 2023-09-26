export default function caPowerSet(originalSet: any[]): any[][] {
  const sets: any[][] = [[]];

  for (let numIdx = 0; numIdx < originalSet.length; numIdx += 1) {
    const existingSetsNum = sets.length;

    for (let setIdx = 0; setIdx < existingSetsNum; setIdx += 1) {
      const set = [...sets[setIdx], originalSet[numIdx]];
      sets.push(set);
    }
  }

  return sets;
}