import Graph from '../../../data-structures/graph/Graph'
import DisjointSet from '../../../data-structures/DisjointSet';
import GraphVertex from '../../../data-structures/graph/GraphVertex';
import GraphEdge from '../../../data-structures/graph/GraphEdge';

export default function detectUndirectedCycleUsingDisjointSet(graph: Graph) {
  const keyExtractor = (graphVertex: GraphVertex) => graphVertex.getKey();
  const disjointSet = new DisjointSet(keyExtractor);
  graph.getAllVertices().forEach((graphVertex) => disjointSet.makeSet(graphVertex));

  let cycleFound = false;
  graph.getAllEdges().forEach((graphEdge: GraphEdge) => {
    if (disjointSet.inSameSet(graphEdge.startVertex, graphEdge.endVertex)) {
      cycleFound = true;
    } else {
      disjointSet.union(graphEdge.startVertex, graphEdge.endVertex);
    }
  });

  return cycleFound;
}