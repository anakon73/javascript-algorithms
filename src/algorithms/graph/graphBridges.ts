import Graph from '../../data-structures/graph/Graph'
import GraphEdge from '../../data-structures/graph/GraphEdge';
import GraphVertex from '../../data-structures/graph/GraphVertex';
import depthFirstSearch from './depthFirstSearch'

class VisitMetadata {
  discoveryTime: number
  lowDiscoveryTime: number

  constructor({ discoveryTime, lowDiscoveryTime }) {
    this.discoveryTime = discoveryTime;
    this.lowDiscoveryTime = lowDiscoveryTime;
  }
}

export default function graphBridges(graph: Graph): {} {
  const visitedSet = {};

  const bridges = {};

  let discoveryTime = 0;

  const startVertex = graph.getAllVertices()[0];

  const dfsCallbacks = {
    enterVertex: ({ currentVertex }: { currentVertex: GraphEdge }) => {
      discoveryTime += 1;

      visitedSet[currentVertex.getKey()] = new VisitMetadata({
        discoveryTime,
        lowDiscoveryTime: discoveryTime,
      });
    },

    leaveVertex: ({ currentVertex, previousVertex }: { currentVertex: GraphVertex, previousVertex: GraphVertex }) => {
      if (previousVertex === null) {
        return;
      }

      visitedSet[currentVertex.getKey()].lowDiscoveryTime = currentVertex.getNeighbors()
        .filter((earlyNeighbor) => earlyNeighbor.getKey() !== previousVertex.getKey())
        .reduce(
          (lowestDiscoveryTime: number, neighbor: GraphVertex) => {
            const neighborLowTime = visitedSet[neighbor.getKey()].lowDiscoveryTime;
            return neighborLowTime < lowestDiscoveryTime ? neighborLowTime : lowestDiscoveryTime;
          },
          visitedSet[currentVertex.getKey()].lowDiscoveryTime,
        );

      const currentLowDiscoveryTime = visitedSet[currentVertex.getKey()].lowDiscoveryTime;
      const previousLowDiscoveryTime = visitedSet[previousVertex.getKey()].lowDiscoveryTime;
      if (currentLowDiscoveryTime < previousLowDiscoveryTime) {
        visitedSet[previousVertex.getKey()].lowDiscoveryTime = currentLowDiscoveryTime;
      }

      const parentDiscoveryTime = visitedSet[previousVertex.getKey()].discoveryTime;
      if (parentDiscoveryTime < currentLowDiscoveryTime) {
        const bridge = graph.findEdge(previousVertex, currentVertex);
        bridges[bridge!.getKey()] = bridge;
      }
    },
    allowTraversal: ({ nextVertex }: { nextVertex: GraphVertex }) => {
      return !visitedSet[nextVertex.getKey()];
    },
  };

  depthFirstSearch(graph, startVertex, dfsCallbacks);

  return bridges;
}