const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const getCipherMap = (alphabet: string[], shift: number = 3): {} => {
  return alphabet
    .reduce((charsMap, currentChar, charIndex) => {
      const charsMapClone = { ...charsMap };
      let encryptedCharIndex = (charIndex + shift) % alphabet.length;
      if (encryptedCharIndex < 0) {
        encryptedCharIndex += alphabet.length;
      }
      charsMapClone[currentChar] = alphabet[encryptedCharIndex];
      return charsMapClone;
    }, {});
};

export const caesarCipherEncrypt = (str: string, shift: number, alphabet: string[] = englishAlphabet): string => {
  const cipherMap = getCipherMap(alphabet, shift);
  return str
    .toLowerCase()
    .split('')
    .map((char) => cipherMap[char] || char)
    .join('');
};

export const caesarCipherDecrypt = (str: string, shift: number, alphabet: string[] = englishAlphabet): string => {
  const cipherMap = getCipherMap(alphabet, -shift);
  return str
    .toLowerCase()
    .split('')
    .map((char) => cipherMap[char] || char)
    .join('');
};