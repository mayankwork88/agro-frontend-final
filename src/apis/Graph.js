class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set();
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2);
    }
    this.adjacencyList[vertex1].add(vertex2);
    this.adjacencyList[vertex2].add(vertex1);
  }

  deleteEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].delete(vertex2);
      this.adjacencyList[vertex2].delete(vertex1);
    }
  }

  deleteVertex(vertex) {
    for (let vert of this.adjacencyList[vertex]) {
      this.deleteEdge(vertex, vert);
    }
    delete this.adjacencyList[vertex];
  }

  display() {
    for (let vertex in this.adjacencyList) {
      console.log(vertex + "->" + [...this.adjacencyList[vertex]]);
    }
  }
}
