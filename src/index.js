import addPitchPatternLines from './add-pitch-pattern-lines.js'
import './styles.css'

const target = document.getElementById('transliteration')

if (target) {
  const transliteration = target.innerHTML
  const withLines = addPitchPatternLines(transliteration)
  target.innerHTML = withLines
}
