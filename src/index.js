import generatePitchPatternLines from './generate-pitch-pattern-lines.js'
import './styles.css'

const targetID = document.currentScript.dataset.id || 'transliteration'
const target = document.getElementById(targetID)

if (target) {
  const transliteration = target.innerText
  const withLines = generatePitchPatternLines(transliteration)
  target.innerHTML = withLines
}
