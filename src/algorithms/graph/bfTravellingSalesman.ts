import Graph from '../../data-structures/graph/Graph'
import GraphVertex from '../../data-structures/graph/GraphVertex'

function findAllPaths(startVertex: GraphVertex, paths: GraphVertex[][] = [], path: GraphVertex[] = []) {
  const currentPath = [...path];

  currentPath.push(startVertex);

  const visitedSet = currentPath.reduce((accumulator, vertex) => {
    const updatedAccumulator = { ...accumulator };
    updatedAccumulator[vertex.getKey()] = vertex;

    return updatedAccumulator;
  }, {});

  const unvisitedNeighbors = startVertex.getNeighbors().filter((neighbor) => {
    return !visitedSet[neighbor.getKey()];
  });

  if (!unvisitedNeighbors.length) {
    paths.push(currentPath);

    return paths;
  }

  for (let neighborIndex = 0; neighborIndex < unvisitedNeighbors.length; neighborIndex += 1) {
    const currentUnvisitedNeighbor = unvisitedNeighbors[neighborIndex];
    findAllPaths(currentUnvisitedNeighbor, paths, currentPath);
  }

  return paths;
}

function getCycleWeight(adjacencyMatrix: number[][], verticesIndices: Object, cycle: GraphVertex[]): number {
  let weight = 0;

  for (let cycleIndex = 1; cycleIndex < cycle.length; cycleIndex += 1) {
    const fromVertex = cycle[cycleIndex - 1];
    const toVertex = cycle[cycleIndex];
    const fromVertexIndex = verticesIndices[fromVertex.getKey()];
    const toVertexIndex = verticesIndices[toVertex.getKey()];
    weight += adjacencyMatrix[fromVertexIndex][toVertexIndex];
  }

  return weight;
}

export default function bfTravellingSalesman(graph: Graph): GraphVertex[] {
  const startVertex = graph.getAllVertices()[0];

  const allPossiblePaths = findAllPaths(startVertex);

  const allPossibleCycles = allPossiblePaths.filter((path) => {
    const lastVertex: GraphVertex = path[path.length - 1];
    const lastVertexNeighbors = lastVertex.getNeighbors();

    return lastVertexNeighbors.includes(startVertex);
  });

  const adjacencyMatrix = graph.getAdjacencyMatrix();
  const verticesIndices = graph.getVerticesIndices();
  let salesmanPath: GraphVertex[] = [];
  let salesmanPathWeight: number = 0;
  for (let cycleIndex = 0; cycleIndex < allPossibleCycles.length; cycleIndex += 1) {
    const currentCycle = allPossibleCycles[cycleIndex];
    const currentCycleWeight = getCycleWeight(adjacencyMatrix, verticesIndices, currentCycle);

    if (salesmanPathWeight === null || currentCycleWeight < salesmanPathWeight) {
      salesmanPath = currentCycle;
      salesmanPathWeight = currentCycleWeight;
    }
  }

  return salesmanPath;
}