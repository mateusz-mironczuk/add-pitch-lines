import addPitchLinesToElement from './add-pitch-lines-to-element.js'
import './styles.css'

const target = document.getElementById('transliteration')

if (target) {
  addPitchLinesToElement(target)
}
