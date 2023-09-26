import { ILinkedListNode, ILinkedList } from '../../data-structures/LinkedList'

function reverseTraversalRecursive(node: ILinkedListNode, callback: Function) {
  if (node) {
    reverseTraversalRecursive(node.next, callback);
    callback(node.value);
  }
}

export default function reverseTraversal(linkedList: ILinkedList, callback: Function) {
  reverseTraversalRecursive(linkedList.head!, callback);
}