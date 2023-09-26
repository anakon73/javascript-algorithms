import graphBridges from './graphBridges';
import Graph from '../../data-structures/graph/Graph'
import GraphVertex from '../../data-structures/graph/GraphVertex';
import GraphEdge from '../../data-structures/graph/GraphEdge';

export default function eulerianPath(graph: Graph): GraphVertex[] {
  const eulerianPathVertices: GraphVertex[] = [];

  const evenRankVertices = {};

  const oddRankVertices = {};

  const notVisitedEdges = {};
  graph.getAllEdges().forEach((vertex) => {
    notVisitedEdges[vertex.getKey()] = vertex;
  });

  graph.getAllVertices().forEach((vertex) => {
    if (vertex.getDegree() % 2) {
      oddRankVertices[vertex.getKey()] = vertex;
    } else {
      evenRankVertices[vertex.getKey()] = vertex;
    }
  });

  const isCircuit = !Object.values(oddRankVertices).length;

  if (!isCircuit && Object.values(oddRankVertices).length !== 2) {
    throw new Error('Eulerian path must contain two odd-ranked vertices');
  }

  let startVertex = null;

  if (isCircuit) {
    const evenVertexKey = Object.keys(evenRankVertices)[0];
    startVertex = evenRankVertices[evenVertexKey];
  } else {
    const oddVertexKey = Object.keys(oddRankVertices)[0];
    startVertex = oddRankVertices[oddVertexKey];
  }

  let currentVertex: GraphVertex | null = startVertex;
  while (Object.values(notVisitedEdges).length) {
    eulerianPathVertices.push(currentVertex!);

    const bridges = graphBridges(graph);

    const currentEdges = currentVertex!.getEdges();
    /** @var {GraphEdge} edgeToDelete */
    let edgeToDelete: GraphEdge | null = null;
    if (currentEdges.length === 1) {
      [edgeToDelete] = currentEdges;
    } else {
      [edgeToDelete] = currentEdges.filter((edge) => !bridges[edge.getKey()]);
    }

    if (currentVertex!.getKey() === edgeToDelete!.startVertex.getKey()) {
      currentVertex = edgeToDelete!.endVertex;
    } else {
      currentVertex = edgeToDelete!.startVertex;
    }

    delete notVisitedEdges[edgeToDelete.getKey()];

    if (Object.values(notVisitedEdges).length === 0) {
      eulerianPathVertices.push(currentVertex);
    }

    graph.deleteEdge(edgeToDelete);
  }

  return eulerianPathVertices;
}