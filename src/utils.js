/**
 * Parses a given HTML string and creates a document.
 * @param {string} html The HTML to parse.
 * @returns {Document} The document created from parsed HTML.
 */
export function parseHTML(html) {
  return new DOMParser()
    .parseFromString(html, 'text/html')
}
