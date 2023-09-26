import { ComplexNumber, type IComplexNumber } from '../complexNumber';

const CLOSE_TO_ZERO_THRESHOLD = 1e-10;

export default function inverseDiscreteFourierTransform(
  frequencies: IComplexNumber[],
  zeroThreshold = CLOSE_TO_ZERO_THRESHOLD,
): number[] {
  const N = frequencies.length;
  const amplitudes = [];

  for (let timer = 0; timer < N; timer += 1) {
    let amplitude = new ComplexNumber();

    for (let frequency = 0; frequency < N; frequency += 1) {
      const currentFrequency = frequencies[frequency];

      const rotationAngle = (2 * Math.PI) * frequency * (timer / N);

      const frequencyContribution = new ComplexNumber({
        re: Math.cos(rotationAngle),
        im: Math.sin(rotationAngle),
      }).multiply(currentFrequency);

      amplitude = amplitude.add(frequencyContribution);
    }

    if (Math.abs(amplitude.re) < zeroThreshold) {
      amplitude.re = 0;
    }

    if (Math.abs(amplitude.im) < zeroThreshold) {
      amplitude.im = 0;
    }

    //@ts-ignore
    amplitudes[timer] = amplitude.re;
  }

  return amplitudes;
}