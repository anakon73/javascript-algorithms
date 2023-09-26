import Comparator from '../utils/comparator'

export class LinkedListNode {
  value: any
  next: LinkedListNode | null

  constructor(value: any, next: LinkedListNode | null = null) {
    this.value = value
    this.next = next
  }

  toString(callback: Function): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

type findType = {
  value?: any
  callback?: Function | undefined
}

export default class LinkedList {
  head: LinkedListNode | null
  tail: LinkedListNode | null
  compare: Comparator

  constructor(comparatorFunction: Function = () => { }) {
    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value: any): LinkedList {
    const newNode = new LinkedListNode(value, this.head)
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: any): LinkedList {
    const newNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail!.next = newNode;
    this.tail = newNode;

    return this;
  }

  insert(value: any, rawIndex: number): LinkedList {
    const index = rawIndex < 0 ? 0 : rawIndex;
    if (index === 0) {
      this.prepend(value);
    } else {
      let count = 1;
      let currentNode = this.head;
      const newNode = new LinkedListNode(value);
      while (currentNode) {
        if (count === index) break;
        currentNode = currentNode.next;
        count += 1;
      }
      if (currentNode) {
        newNode.next = currentNode.next;
        currentNode.next = newNode;
      } else {
        if (this.tail) {
          this.tail.next = newNode;
          this.tail = newNode;
        } else {
          this.head = newNode;
          this.tail = newNode;
        }
      }
    }
    return this;
  }

  delete(value: any): LinkedListNode | null {
    if (!this.head) {
      return null;
    }

    let deletedNode: LinkedListNode | null = null

    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.compare.equal(this.tail!.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode
  }

  find({ value = undefined, callback = undefined }: findType): LinkedListNode | null {
    if (!this.head) {
      return null;
    }

    let currentNode: LinkedListNode | null = this.head;

    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail(): LinkedListNode {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail!
    }

    let currentNode = this.head;
    if (currentNode) {
      while (currentNode.next) {
        if (!currentNode.next.next) {
          currentNode.next = null;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    this.tail = currentNode;

    return deletedTail!;
  }

  deleteHead(): LinkedListNode | null {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  fromArray(values: any[]): LinkedList {
    values.forEach((value) => this.append(value));

    return this;
  }

  toArray(): LinkedListNode[] {
    const nodes: LinkedListNode[] = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback: Function): string {
    return this.toArray().map((node) => node.toString(callback)).toString();
  }

  reverse(): LinkedList {
    let currNode = this.head;
    let prevNode: LinkedListNode | null = null;
    let nextNode: LinkedListNode | null = null;

    while (currNode) {
      nextNode = currNode.next;

      currNode.next = prevNode;

      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}