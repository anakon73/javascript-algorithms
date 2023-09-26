export default function combineWithRepetitions(comboOptions: any[], comboLength: number): any[] {
  if (comboLength === 1) {
    return comboOptions.map((comboOption) => [comboOption])
  }

  const combos: any[] = []

  comboOptions.forEach((currentOption, optionIndex) => {
    const smallerCombos = combineWithRepetitions(
      comboOptions.slice(optionIndex),
      comboLength - 1,
    )

    smallerCombos.forEach((smallerCombo) => {
      combos.push([currentOption].concat(smallerCombo))
    })
  })

  return combos
}