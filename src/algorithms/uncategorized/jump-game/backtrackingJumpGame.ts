export default function backtrackingJumpGame(numbers: number[], startIndex = 0, currentJumps: number[] = []): boolean {
  if (startIndex === numbers.length - 1) {
    // We've jumped directly to last cell. This situation is a solution.
    return true;
  }

  const maxJumpLength = Math.min(
    numbers[startIndex], // Jump is within array.
    numbers.length - 1 - startIndex, // Jump goes beyond array.
  );

  for (let jumpLength = maxJumpLength; jumpLength > 0; jumpLength -= 1) {
    const nextIndex = startIndex + jumpLength;
    currentJumps.push(nextIndex);

    const isJumpSuccessful = backtrackingJumpGame(numbers, nextIndex, currentJumps);

    if (isJumpSuccessful) {
      return true;
    }

    currentJumps.pop();
  }

  return false;
}