import BinaryTreeNode from '../../data-structures/Tree'

type TraversalCallbacks = {
  allowTraversal: (node: BinaryTreeNode, child: BinaryTreeNode) => boolean
  enterNode: (node: BinaryTreeNode) => void
  leaveNode: (node: BinaryTreeNode) => void
}

function initCallbacks(callbacks: TraversalCallbacks): TraversalCallbacks {
  const initiatedCallbacks: TraversalCallbacks = {
    allowTraversal: (node: BinaryTreeNode, child: BinaryTreeNode) => { return false },
    enterNode: (node: BinaryTreeNode) => { },
    leaveNode: (node: BinaryTreeNode) => { },
  }

  const stubCallback = () => { };
  const defaultAllowTraversalCallback = () => true;

  initiatedCallbacks.allowTraversal = callbacks.allowTraversal || defaultAllowTraversalCallback;
  initiatedCallbacks.enterNode = callbacks.enterNode || stubCallback;
  initiatedCallbacks.leaveNode = callbacks.leaveNode || stubCallback;

  return initiatedCallbacks;
}

/**
 * @param {BinaryTreeNode} node - binary tree node that we will start traversal from.
 * @param {TraversalCallbacks} callbacks - the object that contains traversal callbacks.
 */
export function depthFirstSearchRecursive(node: BinaryTreeNode, callbacks: TraversalCallbacks) {
  callbacks.enterNode(node);

  if (node.left && callbacks.allowTraversal(node, node.left)) {
    depthFirstSearchRecursive(node.left, callbacks);
  }

  if (node.right && callbacks.allowTraversal(node, node.right)) {
    depthFirstSearchRecursive(node.right, callbacks);
  }

  callbacks.leaveNode(node);
}

export default function depthFirstSearch(rootNode: BinaryTreeNode, callbacks: TraversalCallbacks) {
  const processedCallbacks = initCallbacks(callbacks);

  depthFirstSearchRecursive(rootNode, processedCallbacks);
}