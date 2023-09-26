import getBit from './getBit';

export default function fullAdder(a: number, b: number): number {
  let result = 0
  let carry = 0

  for (let i = 0; i < 32; i++) {
    const ai = getBit(a, i)
    const bi = getBit(b, i)
    const carryIn = carry

    const aiPlusBi = ai ^ bi

    const bitSum = aiPlusBi ^ carryIn

    const carryOut = (aiPlusBi & carryIn) | (ai & bi)
    carry = carryOut

    result |= bitSum << i
  }

  return result
}
