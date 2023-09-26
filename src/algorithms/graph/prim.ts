import Graph from '../../data-structures/graph/Graph';
import GraphVertex from '../../data-structures/graph/GraphVertex';
import PriorityQueue from '../../data-structures/PriorityQueue'

export default function prim(graph: Graph): Graph {
  if (graph.isDirected) {
    throw new Error('Prim\'s algorithms works only for undirected graphs');
  }

  const minimumSpanningTree = new Graph();

  const edgesQueue = new PriorityQueue();

  const visitedVertices = {};

  const startVertex = graph.getAllVertices()[0];

  visitedVertices[startVertex.getKey()] = startVertex;

  startVertex.getEdges().forEach((graphEdge) => {
    edgesQueue.add(graphEdge, graphEdge.weight);
  });

  while (!edgesQueue.isEmpty()) {
    /** @var {GraphEdge} currentEdge */
    const currentMinEdge = edgesQueue.poll();

    let nextMinVertex: GraphVertex | null = null;
    if (!visitedVertices[currentMinEdge.startVertex.getKey()]) {
      nextMinVertex = currentMinEdge.startVertex;
    } else if (!visitedVertices[currentMinEdge.endVertex.getKey()]) {
      nextMinVertex = currentMinEdge.endVertex;
    }

    if (nextMinVertex) {
      minimumSpanningTree.addEdge(currentMinEdge);

      visitedVertices[nextMinVertex.getKey()] = nextMinVertex;

      nextMinVertex.getEdges().forEach((graphEdge) => {
        if (
          !visitedVertices[graphEdge.startVertex.getKey()]
          || !visitedVertices[graphEdge.endVertex.getKey()]
        ) {
          edgesQueue.add(graphEdge, graphEdge.weight);
        }
      });
    }
  }

  return minimumSpanningTree;
}