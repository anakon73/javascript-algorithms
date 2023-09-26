export class DisjointSetItem {
  value: any
  keyCallback: (value: any) => any
  parent: DisjointSetItem | null
  children: any
  constructor(value: any, keyCallback: (value: any) => any) {
    this.value = value;
    this.keyCallback = keyCallback;
    this.parent = null;
    this.children = {};
  }

  getKey(): any {
    if (this.keyCallback) {
      return this.keyCallback(this.value);
    }

    return this.value;
  }

  getRoot(): DisjointSetItem {
    return this.isRoot() ? this : this.parent!.getRoot();
  }

  isRoot(): boolean {
    return this.parent === null;
  }

  getRank(): number {
    if (this.getChildren().length === 0) {
      return 0;
    }

    let rank = 0;

    this.getChildren().forEach((child) => {
      rank += 1;

      rank += child.getRank();
    });

    return rank;
  }

  getChildren(): DisjointSetItem[] {
    return Object.values(this.children)
  }

  setParent(parentItem: DisjointSetItem, forceSettingParentChild = true): DisjointSetItem {
    this.parent = parentItem;
    if (forceSettingParentChild) {
      parentItem.addChild(this);
    }

    return this;
  }

  addChild(childItem: DisjointSetItem): DisjointSetItem {
    this.children![childItem.getKey()] = childItem;
    childItem.setParent(this, false);

    return this;
  }
}

export default class DisjointSet {
  keyCallback: (value: any) => any
  items: any

  constructor(keyCallback: (value: any) => any) {
    this.keyCallback = keyCallback;
    this.items = {};
  }

  makeSet(itemValue: any): DisjointSet {
    const disjointSetItem = new DisjointSetItem(itemValue, this.keyCallback);

    if (!this.items[disjointSetItem.getKey()]) {
      this.items[disjointSetItem.getKey()] = disjointSetItem;
    }

    return this;
  }

  find(itemValue: any): string | null {
    const templateDisjointItem = new DisjointSetItem(itemValue, this.keyCallback);

    const requiredDisjointItem = this.items[templateDisjointItem.getKey()];

    if (!requiredDisjointItem) {
      return null;
    }

    return requiredDisjointItem.getRoot().getKey();
  }

  union(valueA: any, valueB: any): DisjointSet {
    const rootKeyA = this.find(valueA);
    const rootKeyB = this.find(valueB);

    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('One or two values are not in sets');
    }

    if (rootKeyA === rootKeyB) {
      return this;
    }

    const rootA = this.items[rootKeyA];
    const rootB = this.items[rootKeyB];

    if (rootA.getRank() < rootB.getRank()) {
      rootB.addChild(rootA);

      return this;
    }

    rootA.addChild(rootB);

    return this;
  }

  inSameSet(valueA: any, valueB: any): boolean {
    const rootKeyA = this.find(valueA);
    const rootKeyB = this.find(valueB);

    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('One or two values are not in sets');
    }

    return rootKeyA === rootKeyB;
  }
}