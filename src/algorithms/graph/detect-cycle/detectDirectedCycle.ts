import Graph from '../../../data-structures/graph/Graph'
import depthFirstSearch from '../depthFirstSearch';

export default function detectDirectedCycle(graph: Graph) {
  let cycle: any = null;

  const dfsParentMap = {};

  const whiteSet = {};

  const graySet = {};

  const blackSet = {};


  /** @param {GraphVertex} vertex */
  graph.getAllVertices().forEach((vertex) => {
    whiteSet[vertex.getKey()] = vertex;
  });

  const callbacks = {
    enterVertex: ({ currentVertex, previousVertex }) => {
      if (graySet[currentVertex.getKey()]) {
        cycle = {};

        let currentCycleVertex = currentVertex;
        let previousCycleVertex = previousVertex;

        while (previousCycleVertex.getKey() !== currentVertex.getKey()) {
          cycle[currentCycleVertex.getKey()] = previousCycleVertex;
          currentCycleVertex = previousCycleVertex;
          previousCycleVertex = dfsParentMap[previousCycleVertex.getKey()];
        }

        cycle[currentCycleVertex.getKey()] = previousCycleVertex;
      } else {
        graySet[currentVertex.getKey()] = currentVertex;
        delete whiteSet[currentVertex.getKey()];

        dfsParentMap[currentVertex.getKey()] = previousVertex;
      }
    },
    leaveVertex: ({ currentVertex }) => {
      blackSet[currentVertex.getKey()] = currentVertex;
      delete graySet[currentVertex.getKey()];
    },
    allowTraversal: ({ nextVertex }) => {
      if (cycle) {
        return false;
      }

      return !blackSet[nextVertex.getKey()];
    },
  };

  while (Object.keys(whiteSet).length) {
    const firstWhiteKey = Object.keys(whiteSet)[0];
    const startVertex = whiteSet[firstWhiteKey];
    depthFirstSearch(graph, startVertex, callbacks);
  }

  return cycle;
}