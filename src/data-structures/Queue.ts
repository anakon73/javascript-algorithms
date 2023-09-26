import LinkedList from './LinkedList';

export default class Queue {
  linkedList: LinkedList

  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty(): boolean {
    return !this.linkedList.head;
  }

  peek(): any {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.head!.value;
  }

  enqueue(value: any) {
    this.linkedList.append(value);
  }

  dequeue(): any {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  toString(callback: any): string {
    return this.linkedList.toString(callback);
  }
}