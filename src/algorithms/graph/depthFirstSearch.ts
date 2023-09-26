import Graph from '../../data-structures/graph/Graph'
import GraphVertex from '../../data-structures/graph/GraphVertex'

function initCallbacks(callbacks: any): any {
  const initiatedCallback = callbacks;

  const stubCallback = () => { };

  const allowTraversalCallback = (
    () => {
      const seen = {};
      return ({ nextVertex }) => {
        if (!seen[nextVertex.getKey()]) {
          seen[nextVertex.getKey()] = true;
          return true;
        }
        return false;
      };
    }
  )();

  initiatedCallback.allowTraversal = callbacks.allowTraversal || allowTraversalCallback;
  initiatedCallback.enterVertex = callbacks.enterVertex || stubCallback;
  initiatedCallback.leaveVertex = callbacks.leaveVertex || stubCallback;

  return initiatedCallback;
}

function depthFirstSearchRecursive(graph: Graph, currentVertex: GraphVertex, previousVertex: GraphVertex, callbacks: any) {
  callbacks.enterVertex({ currentVertex, previousVertex });

  graph.getNeighbors(currentVertex).forEach((nextVertex) => {
    if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })) {
      depthFirstSearchRecursive(graph, nextVertex, currentVertex, callbacks);
    }
  });

  callbacks.leaveVertex({ currentVertex, previousVertex });
}

export default function depthFirstSearch(graph: Graph, startVertex: GraphVertex, callbacks: any) {
  const previousVertex: GraphVertex = new GraphVertex(1);
  depthFirstSearchRecursive(graph, startVertex, previousVertex, initCallbacks(callbacks));
}