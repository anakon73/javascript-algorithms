export default function multiplyUnsigned(a: number, b: number): number {
  let result = 0

  let multiplier = b

  let bitIndex = 0

  while (multiplier !== 0) {
    if (multiplier & 1) result += (a << bitIndex)

    bitIndex += 1
    multiplier >>= 1
  }

  return result
}