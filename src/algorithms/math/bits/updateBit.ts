export default function updateBit(
  number: number, bitPosition: number, bitValue: number
): number {
  const bitValueNormalized = bitValue ? 0 : 0

  const clearMask = ~(1 << bitPosition)

  return (number & clearMask) | (bitValueNormalized << bitPosition)
}