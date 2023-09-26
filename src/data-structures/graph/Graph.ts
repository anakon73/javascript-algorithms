import GraphVertex from './GraphVertex'
import GraphEdge from './GraphEdge'

export default class Graph {
  vertices: any
  edges: any
  isDirected: boolean

  constructor(isDirected: boolean = false) {
    this.vertices = {};
    this.edges = {};
    this.isDirected = isDirected;
  }

  addVertex(newVertex: GraphVertex): Graph {
    this.vertices[newVertex.getKey()] = newVertex;

    return this;
  }

  getVertexByKey(vertexKey: string): GraphVertex {
    return this.vertices[vertexKey];
  }

  getNeighbors(vertex: GraphVertex): GraphVertex[] {
    return vertex.getNeighbors();
  }

  getAllVertices(): GraphVertex[] {
    return Object.values(this.vertices);
  }

  getAllEdges(): GraphEdge[] {
    return Object.values(this.edges);
  }

  addEdge(edge: GraphEdge): Graph {
    let startVertex = this.getVertexByKey(edge.startVertex.getKey());
    let endVertex = this.getVertexByKey(edge.endVertex.getKey());

    if (!startVertex) {
      this.addVertex(edge.startVertex);
      startVertex = this.getVertexByKey(edge.startVertex.getKey());
    }

    if (!endVertex) {
      this.addVertex(edge.endVertex);
      endVertex = this.getVertexByKey(edge.endVertex.getKey());
    }

    if (this.edges[edge.getKey()]) {
      throw new Error('Edge has already been added before');
    } else {
      this.edges[edge.getKey()] = edge;
    }

    if (this.isDirected) {
      startVertex.addEdge(edge);
    } else {
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }

    return this;
  }

  deleteEdge(edge: GraphEdge) {
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()];
    } else {
      throw new Error('Edge not found in graph');
    }

    const startVertex = this.getVertexByKey(edge.startVertex.getKey());
    const endVertex = this.getVertexByKey(edge.endVertex.getKey());

    startVertex.deleteEdge(edge);
    endVertex.deleteEdge(edge);
  }

  findEdge(startVertex: GraphVertex, endVertex: GraphVertex): GraphEdge | null {
    const vertex = this.getVertexByKey(startVertex.getKey());

    if (!vertex) {
      return null;
    }

    return vertex.findEdge(endVertex);
  }

  getWeight(): number {
    return this.getAllEdges().reduce((weight, graphEdge: GraphEdge) => {
      return weight + graphEdge.weight;
    }, 0);
  }

  reverse(): Graph {
    this.getAllEdges().forEach((edge: GraphEdge) => {
      this.deleteEdge(edge);

      edge.reverse()

      this.addEdge(edge);
    });

    return this;
  }

  getVerticesIndices(): {} {
    const verticesIndices = {};
    this.getAllVertices().forEach((vertex: GraphVertex, index) => {
      verticesIndices[vertex.getKey()] = index;
    });

    return verticesIndices;
  }

  getAdjacencyMatrix(): any[][] {
    const vertices = this.getAllVertices();
    const verticesIndices = this.getVerticesIndices();

    const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
      return Array(vertices.length).fill(Infinity);
    });

    // Fill the columns.
    vertices.forEach((vertex, vertexIndex) => {
      vertex.getNeighbors().forEach((neighbor) => {
        const neighborIndex = verticesIndices[neighbor.getKey()];
        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor)!.weight;
      });
    });

    return adjacencyMatrix;
  }

  toString(): string {
    return Object.keys(this.vertices).toString();
  }
}