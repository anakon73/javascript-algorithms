import countSetBits from "./countSetBits";

export default function bitsDiff(a: number, b: number): number {
  return countSetBits(a ^ b)
}
