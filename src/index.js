import generatePitchPatternLines from './generate-pitch-pattern-lines.js'
import './styles.css'

const target = document.getElementById('transliteration')

if (target) {
  const transliteration = target.innerHTML
  const withLines = generatePitchPatternLines(transliteration)
  target.innerHTML = withLines
}
