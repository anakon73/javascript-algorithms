import Graph from '../../data-structures/graph/Graph';
import QuickSort from '../sorting/QuickSort/QuickSort';
import DisjointSet from '../../data-structures/DisjointSet';
import GraphEdge from '../../data-structures/graph/GraphEdge';

export default function kruskal(graph: Graph): Graph {
  if (graph.isDirected) {
    throw new Error('Kruskal\'s algorithms works only for undirected graphs');
  }

  const minimumSpanningTree = new Graph();

  const sortingCallbacks = {
    compareCallback: (graphEdgeA: GraphEdge, graphEdgeB: GraphEdge) => {
      if (graphEdgeA.weight === graphEdgeB.weight) {
        return 1;
      }

      return graphEdgeA.weight <= graphEdgeB.weight ? -1 : 1;
    },
  };
  const sortedEdges = new QuickSort(sortingCallbacks).sort(graph.getAllEdges());

  const keyCallback = (graphVertex) => graphVertex.getKey();
  const disjointSet = new DisjointSet(keyCallback);

  graph.getAllVertices().forEach((graphVertex) => {
    disjointSet.makeSet(graphVertex);
  });

  for (let edgeIndex = 0; edgeIndex < sortedEdges.length; edgeIndex += 1) {
    const currentEdge: GraphEdge = sortedEdges[edgeIndex];

    if (!disjointSet.inSameSet(currentEdge.startVertex, currentEdge.endVertex)) {
      disjointSet.union(currentEdge.startVertex, currentEdge.endVertex);

      minimumSpanningTree.addEdge(currentEdge);
    }
  }

  return minimumSpanningTree;
}