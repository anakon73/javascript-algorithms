type item = string | number

interface IHashTable {
  store: [string, item][]
  hash(key: string): number
  add(key: string, value: item): IHashTable
  get(key: string): item
}

class HashTable {
  store = new Array(10)

  hash(key: string) {
    let sum = 0

    for (let i = 0; i < key.length; i++) {
      sum += key.charCodeAt(i)
    }

    return sum
  }

  add(key: string, value: item) {
    this.store[this.hash(key)] = this.store[this.hash(key)] || []
    this.store[this.hash(key)].push({ key, value })
  }
  get(key: string) {
    return this.store[this.hash(key)].find((item: { key: string, value: item }) => item.key === key).value
  }
}

const dict = new HashTable()
dict.add('ab', '1')
dict.add('ba', '2')
console.log(dict.get('ab'), dict.get('ba'))