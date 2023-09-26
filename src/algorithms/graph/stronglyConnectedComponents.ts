import Stack from '../../data-structures/Stack';
import Graph from '../../data-structures/graph/Graph';
import GraphVertex from '../../data-structures/graph/GraphVertex';
import depthFirstSearch from './depthFirstSearch';

function getVerticesSortedByDfsFinishTime(graph: Graph): Stack {
  const visitedVerticesSet = {};

  const verticesByDfsFinishTime = new Stack();

  const notVisitedVerticesSet = {};
  graph.getAllVertices().forEach((vertex) => {
    notVisitedVerticesSet[vertex.getKey()] = vertex;
  });

  const dfsCallbacks = {
    enterVertex: ({ currentVertex }: { currentVertex: GraphVertex }) => {
      visitedVerticesSet[currentVertex.getKey()] = currentVertex;

      delete notVisitedVerticesSet[currentVertex.getKey()];
    },
    leaveVertex: ({ currentVertex }: { currentVertex: GraphVertex }) => {
      verticesByDfsFinishTime.push(currentVertex);
    },
    allowTraversal: ({ nextVertex }: { nextVertex: GraphVertex }) => {
      return !visitedVerticesSet[nextVertex.getKey()];
    },
  };

  while (Object.values(notVisitedVerticesSet).length) {
    const startVertexKey = Object.keys(notVisitedVerticesSet)[0];
    const startVertex = notVisitedVerticesSet[startVertexKey];
    delete notVisitedVerticesSet[startVertexKey];

    depthFirstSearch(graph, startVertex, dfsCallbacks);
  }

  return verticesByDfsFinishTime;
}

function getSCCSets(graph: Graph, verticesByFinishTime: Stack): any[] {
  const stronglyConnectedComponentsSets: GraphVertex[][] = [];

  let stronglyConnectedComponentsSet: GraphVertex[] = [];

  const visitedVerticesSet = {};

  const dfsCallbacks = {
    enterVertex: ({ currentVertex }: { currentVertex: GraphVertex }) => {
      stronglyConnectedComponentsSet.push(currentVertex)

      visitedVerticesSet[currentVertex.getKey()] = currentVertex;
    },
    leaveVertex: ({ previousVertex }: { previousVertex: GraphVertex }) => {
      if (previousVertex === null) {
        stronglyConnectedComponentsSets.push([...stronglyConnectedComponentsSet]);
      }
    },
    allowTraversal: ({ nextVertex }: { nextVertex: GraphVertex }) => {
      return !visitedVerticesSet[nextVertex.getKey()];
    },
  };

  while (!verticesByFinishTime.isEmpty()) {
    const startVertex: GraphVertex = verticesByFinishTime.pop();

    stronglyConnectedComponentsSet = [];

    if (!visitedVerticesSet[startVertex.getKey()]) {
      depthFirstSearch(graph, startVertex, dfsCallbacks);
    }
  }

  return stronglyConnectedComponentsSets;
}

export default function stronglyConnectedComponents(graph: Graph): any[] {

  const verticesByFinishTime = getVerticesSortedByDfsFinishTime(graph);

  graph.reverse();

  return getSCCSets(graph, verticesByFinishTime);
}