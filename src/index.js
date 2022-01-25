import generatePitchPatternLines from './generate-pitch-pattern-lines.js'

const transliterationContainer = document.getElementById('transliteration')

if (transliterationContainer) {
  const transliteration = transliterationContainer.innerText
  const withLines = generatePitchPatternLines(transliteration)
  transliterationContainer.innerHTML = withLines
}
