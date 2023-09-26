import euclideanDistance from '../math/euclideanDistance';

export default function kNN(
  dataSet: number[][],
  labels: number[],
  toClassify: number[],
  k = 3,
): number {
  if (!dataSet || !labels || !toClassify) {
    throw new Error('Either dataSet or labels or toClassify were not set');
  }

  const distances: { dist: number, label: number }[] = [];
  for (let i = 0; i < dataSet.length; i += 1) {
    distances.push({
      dist: euclideanDistance([dataSet[i]], [toClassify]),
      label: labels[i],
    });
  }

  const kNearest = distances.sort((a, b) => {
    if (a.dist === b.dist) {
      return 0;
    }
    return a.dist < b.dist ? -1 : 1;
  }).slice(0, k);

  const labelsCounter = {};
  let topClass = 0;
  let topClassCount = 0;
  for (let i = 0; i < kNearest.length; i += 1) {
    if (kNearest[i].label in labelsCounter) {
      labelsCounter[kNearest[i].label] += 1;
    } else {
      labelsCounter[kNearest[i].label] = 1;
    }
    if (labelsCounter[kNearest[i].label] > topClassCount) {
      topClassCount = labelsCounter[kNearest[i].label];
      topClass = kNearest[i].label;
    }
  }

  return topClass;
}