import { ComplexNumber, type IComplexNumber } from '../complexNumber'

const CLOSE_TO_ZERO_THRESHOLD = 1e-10;

export default function dft(inputAmplitudes: number[], zeroThreshold = CLOSE_TO_ZERO_THRESHOLD): IComplexNumber[] {
  const N = inputAmplitudes.length
  const signals: IComplexNumber[] = []

  for (let frequency = 0; frequency < N; frequency += 1) {
    let frequencySignal = new ComplexNumber()

    for (let timer = 0; timer < N; timer += 1) {
      const currentAmplitude = inputAmplitudes[timer];

      const rotationAngle = -1 * (2 * Math.PI) * frequency * (timer / N);

      const dataPointContribution = new ComplexNumber({
        re: Math.cos(rotationAngle),
        im: Math.sin(rotationAngle),
      }).multiply(currentAmplitude)

      frequencySignal = frequencySignal.add(dataPointContribution);
    }

    if (Math.abs(frequencySignal.re) < zeroThreshold) {
      frequencySignal.re = 0
    }

    if (Math.abs(frequencySignal.im) < zeroThreshold) {
      frequencySignal.im = 0
    }

    frequencySignal = frequencySignal.divide(N)

    signals[frequency] = frequencySignal
  }

  return signals;
}