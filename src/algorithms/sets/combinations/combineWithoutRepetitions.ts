export default function combineWithoutRepetitions(comboOptions: any[], comboLength: number): any[] {
  if (comboLength === 1) {
    return comboOptions.map((comboOption) => [comboOption])
  }

  const combos: any[] = []

  comboOptions.forEach((currentOption, optionIndex) => {
    const smallerCombos = combineWithoutRepetitions(
      comboOptions.slice(optionIndex + 1),
      comboLength - 1,
    )

    smallerCombos.forEach((smallerCombo) => {
      combos.push([currentOption].concat(smallerCombo))
    })
  })

  return combos
}