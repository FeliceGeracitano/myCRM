class PriorityNode {
  key: number;
  priority: number;

  constructor(key: number, priority: number) {
    this.key = key;
    this.priority = priority;
  }
}

class PriorityQueue {
  nodes: PriorityNode[] = [];

  enqueue(priority: number, key: number) {
    this.nodes.push(new PriorityNode(key, priority));
    this.nodes.sort(function(a, b) {
      return a.priority - b.priority;
    });
  }

  dequeue(): number {
    return this.nodes.shift().key;
  }

  empty(): boolean {
    return !this.nodes.length;
  }
}

export class Dijkstra {
  infinity = 1 / 0;
  vertices = {};

  addVertex(name: string, edges: any) {
    this.vertices[name] = edges;
  }

  shortestPath(start: string, finish: string) {
    const nodes = new PriorityQueue(),
      distances = {},
      previous = {},
      path = [];

    let vertex, smallest, neighbor, alt;

    if (!this.vertices) {
      return [];
    }

    // Init the distances and queues variables
    for (vertex in this.vertices) {
      if (!this.vertices.hasOwnProperty(vertex)) {
        continue;
      }

      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      } else {
        distances[vertex] = this.infinity;
        nodes.enqueue(this.infinity, vertex);
      }
      previous[vertex] = null;
    }

    // Continue as long as the queue haven't been emptied.
    while (!nodes.empty()) {
      smallest = nodes.dequeue();
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push({ key: smallest, cost: distances[smallest] });
          smallest = previous[smallest];
        }
        break;
      }
      if (!smallest || distances[smallest] === this.infinity) {
        continue;
      }
      for (neighbor in this.vertices[smallest]) {
        if (!this.vertices[smallest].hasOwnProperty(neighbor)) {
          continue;
        }
        alt = distances[smallest] + this.vertices[smallest][neighbor];
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;
          nodes.enqueue(alt, neighbor);
        }
      }
    }
    return path.concat({ key: start, cost: distances[start] }).reverse();
  }
}
