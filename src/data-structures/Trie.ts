interface ITrieNode {
  children: any
  isWordEnd: boolean
}

interface ITrie {
  root: ITrieNode
  insert(word: string): void
  contains(word: string): boolean
  startsWithPrefix(prefix: string): boolean
}

class TrieNode<T> implements ITrieNode {
  children: any = {}
  isWordEnd: boolean = false
}

class Trie<T> implements ITrie {
  root: ITrieNode

  constructor() {
    this.root = new TrieNode()
  }

  insert(word: string) {
    let curr = this.root
    for (let i = 0; i < word.length; i++) {
      let charToInsert = word[i]

      if (!(charToInsert in curr.children)) {
        curr.children[charToInsert] = new Node()
      }

      curr = curr.children[charToInsert]
    }

    curr.isWordEnd = true
  }

  contains(word: string) {
    let curr = this.root
    for (let i = 0; i < word.length; i++) {
      let charToFind = word[i]

      if (!(charToFind in curr.children)) {
        return false
      }

      curr = curr.children[charToFind]
    }

    return curr.isWordEnd
  }

  startsWithPrefix(prefix: string) {
    let curr = this.root
    for (let i = 0; i < prefix.length; i++) {
      let charToFind = prefix[i]

      if (!(charToFind in curr.children)) {
        return false
      }

      curr = curr.children[charToFind]
    }

    return true
  }
}

const trie = new Trie