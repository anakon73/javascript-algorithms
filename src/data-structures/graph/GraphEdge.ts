import GraphVertex from "./GraphVertex";

export default class GraphEdge {
  startVertex: GraphVertex
  endVertex: GraphVertex
  weight: number

  constructor(startVertex, endVertex, weight = 0) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }

  getKey(): string {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();

    return `${startVertexKey}_${endVertexKey}`;
  }

  reverse(): GraphEdge {
    const tmp = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = tmp;

    return this;
  }

  toString(): string {
    return this.getKey();
  }
}