export interface ISimplePolynomialHash {
  base: number
  hash(word: string): number
  roll(prevHash: number, prevWord: string, newWord: string): number
}

const DEFAULT_BASE = 17;

export default class SimplePolynomialHash<T> implements ISimplePolynomialHash {
  base: number

  constructor(base = DEFAULT_BASE) {
    this.base = base;
  }

  hash(word: string): number {
    let hash = 0;
    for (let charIndex = 0; charIndex < word.length; charIndex += 1) {
      hash += word.charCodeAt(charIndex) * (this.base ** charIndex);
    }

    return hash;
  }

  roll(prevHash: number, prevWord: string, newWord: string): number {
    let hash = prevHash;

    const prevValue = prevWord.charCodeAt(0);
    const newValue = newWord.charCodeAt(newWord.length - 1);

    hash -= prevValue;
    hash /= this.base;
    hash += newValue * (this.base ** (newWord.length - 1));

    return hash;
  }
}