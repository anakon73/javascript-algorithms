import LinkedList from './LinkedList';

export default class Stack {
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

  push(value: any) {
    this.linkedList.prepend(value);
  }

  pop(): any {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  toArray(): any[] {
    return this.linkedList
      .toArray()
      .map((linkedListNode) => linkedListNode.value);
  }

  toString(callback: Function): string {
    return this.linkedList.toString(callback);
  }
}
