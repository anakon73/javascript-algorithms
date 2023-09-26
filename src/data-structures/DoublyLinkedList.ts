type value = string | number | null

interface ILinkedListNode<T> {
  val: value
  prev: ILinkedListNode<T> | null
  next: ILinkedListNode<T> | null
}

interface ILinkedList<T> {
  head: ILinkedListNode<T> | null
  tail: ILinkedListNode<T> | null
  length: number
  push(val: value): ILinkedList<T>
  pop(): ILinkedList<T> | null
  unshift(val: value): ILinkedList<T>
  shift(): ILinkedList<T> | null
  insert(index: number, val: value): ILinkedList<T> | null | boolean
  remove(index: number): ILinkedList<T> | null | boolean
}

class LinkedListNode<T> implements ILinkedListNode<T> {
  val: value
  prev: LinkedListNode<T> | null
  next: LinkedListNode<T> | null

  constructor(val: value) {
    this.val = val
    this.prev = null
    this.next = null
  }
}

class DoublyLinkedList<T> implements ILinkedList<T> {
  head: LinkedListNode<T> | null
  tail: LinkedListNode<T> | null
  length: number

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  push(val: value) {
    let node = new LinkedListNode(val)

    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      let temp = this.tail
      this.tail = node
      node.prev = temp
      temp!.next = node
    }
    this.length++
    return this
  }

  pop() {
    if (!this.head) return null
    let temp = this.tail
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      this.tail = temp!.prev
      this.tail!.next = null
      temp!.prev = null
    }
    this.length--
    return this
  }

  unshift(val: value) {
    let node = new LinkedListNode(val)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      let temp = this.head
      this.head = node
      node.next = temp
      temp.prev = node
    }
    this.length++
    return this
  }

  shift() {
    if (!this.head) return null
    let temp = this.head
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head = temp.next
      this.head!.prev = null
      temp.next = null
    }
    this.length--
    return this
  }

  insert(index: number, val: value) {
    if (index <= 0 || index > this.length) return null
    let node = new LinkedListNode(val)
    if (index === 0) return !!this.unshift(node.val)
    if (index === this.length) return this.push(node.val)

    let current = this.head
    let counter = 0

    while (counter !== index) {
      current = current!.next
      counter++
    }

    let temp = current
    let prev = temp!.prev
    prev!.next = node
    node.next = temp
    node.prev = prev
    this.length++
    return this
  }

  remove(index: number) {
    if (index < 0 || index > this.length) return null
    if (index === 0) return !!this.shift()
    if (index === this.length - 1) return !!this.pop()

    let current = this.head
    let counter = 0

    while (counter !== index) {
      current = current!.next
      counter++
    }

    let prev = current?.prev
    let next = current?.next
    prev!.next = next!
    next!.prev = prev!
    this.length--
    return true
  }
}

let list = new DoublyLinkedList
list.push(1)
list.push(2)
list.push(3)
list.push(4)
list.unshift(0)
console.log(list)