import addPitchPatternLines from './add-pitch-pattern-lines.js'
import * as utils from './utils.js'

/**
 * Adds pitch pattern lines to the contents of a given element.
 * @param {HTMLElement} element The element to process.
 */
export default function addPitchPatternLinesToElement(element) {
  Array
    .from(element.childNodes)
    .filter(isTextNode)
    .forEach(addPitchPatternLinesToTextNode)
}

function isTextNode(node) {
  return node.nodeType === Node.TEXT_NODE
}

function addPitchPatternLinesToTextNode(node) {
  const transliteration = node.nodeValue.trim()
  const withLines = addPitchPatternLines(transliteration)

  if (withLines !== transliteration) {
    const nodes = utils
      .parseHTML(withLines)
      .body.childNodes
    node.replaceWith(...nodes)
  }
}
