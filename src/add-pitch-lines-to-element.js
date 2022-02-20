import addPitchLines from './add-pitch-lines.js'
import * as utils from './utils.js'

/**
 * Adds pitch pattern lines to the contents of a given element.
 * @param {HTMLElement} element The element to process.
 */
export default function addPitchLinesToElement(element) {
  Array
    .from(element.childNodes)
    .filter(isTextNode)
    .forEach(addPitchLinesToTextNode)
}

function isTextNode(node) {
  return node.nodeType === Node.TEXT_NODE
}

function addPitchLinesToTextNode(node) {
  const transliteration = node.nodeValue.trim()
  const withLines = addPitchLines(transliteration)

  if (withLines !== transliteration) {
    const nodes = utils
      .parseHTML(withLines)
      .body.childNodes
    node.replaceWith(...nodes)
  }
}
