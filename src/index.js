import addPitchPatternLinesToElement from './add-pitch-pattern-lines-to-element.js'
import './styles.css'

const target = document.getElementById('transliteration')

if (target) {
  addPitchPatternLinesToElement(target)
}
