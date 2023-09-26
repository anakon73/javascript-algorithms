import reverseTraversal from './reverseTraversal'
import LinkedList from '../../data-structures/LinkedList'

const linkedList = new LinkedList()

linkedList
  .append(1)
  .append(2)
  .append(3)

const traversedNodeValues: any = []

const traversalCallback = (nodeValue: any) => {
  traversedNodeValues.push(nodeValue)
}

reverseTraversal(linkedList, traversalCallback)

console.log(traversedNodeValues)