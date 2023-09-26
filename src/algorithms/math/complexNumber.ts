import radianToDegree from "./radian/radianToDegree"

export interface IComplexNumber {
  re: number
  im: number
  add(added: IComplexNumber | number): IComplexNumber
  toComplexNumber(number: IComplexNumber | number): IComplexNumber
  subtract(subtrahend: IComplexNumber | number): IComplexNumber
  multiply(multiplicand: IComplexNumber | number): IComplexNumber
  divide(divider: IComplexNumber | number): IComplexNumber
  conjugate(number: IComplexNumber | number): IComplexNumber
  getRadius(): number
  getPhase(inRadians: boolean): number
  getPolarForm(inRadians: boolean): { radius: number, phase: number }
}

export class ComplexNumber<T> implements IComplexNumber {
  re: number
  im: number

  constructor({ im = 0, re = 0 } = {}) {
    this.im = im
    this.re = re
  }

  add(added: IComplexNumber | number): IComplexNumber {
    const complexAdded = this.toComplexNumber(added)

    return new ComplexNumber({
      re: this.re + complexAdded.re,
      im: this.im + complexAdded.im,
    })
  }

  subtract(subtrahend: number | IComplexNumber): IComplexNumber {
    const complexSubtrahend = this.toComplexNumber(subtrahend)

    return new ComplexNumber({
      re: this.re - complexSubtrahend.re,
      im: this.im - complexSubtrahend.im,
    })
  }

  multiply(multiplicand: number | IComplexNumber): IComplexNumber {
    const complexMultiplicand = this.toComplexNumber(multiplicand)

    return new ComplexNumber({
      re: this.re * complexMultiplicand.re - this.im * complexMultiplicand.im,
      im: this.re * complexMultiplicand.im + this.im * complexMultiplicand.re,
    })
  }

  conjugate(number: number | IComplexNumber): IComplexNumber {
    const complexNumber = this.toComplexNumber(number)

    return new ComplexNumber({
      re: complexNumber.re,
      im: -1 * complexNumber.im,
    })
  }

  divide(divider: number | IComplexNumber): IComplexNumber {
    const complexDivider = this.toComplexNumber(divider)
    const dividerConjugate = this.conjugate(complexDivider)
    const finalDivident = this.multiply(dividerConjugate)
    const finalDivider = (complexDivider.re ** 2) + (complexDivider.im ** 2)

    return new ComplexNumber({
      re: finalDivident.re / finalDivider,
      im: finalDivident.im / finalDivider,
    })
  }

  getRadius() {
    return Math.sqrt((this.re ** 2) + (this.im ** 2));
  }

  getPhase(inRadians: boolean = true): number {
    let phase = Math.atan(Math.abs(this.im) / Math.abs(this.re))

    if (this.re < 0 && this.im > 0) {
      phase = Math.PI - phase
    } else if (this.re < 0 && this.im < 0) {
      phase = -(Math.PI - phase)
    } else if (this.re > 0 && this.im < 0) {
      phase = -phase
    } else if (this.re === 0 && this.im > 0) {
      phase = Math.PI / 2
    } else if (this.re === 0 && this.im < 0) {
      phase = -Math.PI / 2
    } else if (this.re < 0 && this.im === 0) {
      phase = Math.PI
    } else if (this.re > 0 && this.im === 0) {
      phase = 0
    } else if (this.re === 0 && this.im === 0) {
      phase = 0
    }

    if (!inRadians) {
      phase = radianToDegree(phase)
    }

    return phase
  }

  getPolarForm(inRadians: boolean = true): { radius: number, phase: number } {
    return {
      radius: this.getRadius(),
      phase: this.getPhase(inRadians),
    }
  }

  toComplexNumber(number: IComplexNumber | number): IComplexNumber {
    if (number instanceof ComplexNumber) return number

    if (typeof number === 'number') return new ComplexNumber({ re: number })

    return new ComplexNumber()
  }
}