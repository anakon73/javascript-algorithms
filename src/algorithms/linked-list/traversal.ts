import { ILinkedList } from "../../data-structures/LinkedList";

export default function traversal(linkedList: ILinkedList, callback: Function) {
  let currentNode = linkedList.head;

  while (currentNode) {
    callback(currentNode.value);
    currentNode = currentNode.next;
  }
}