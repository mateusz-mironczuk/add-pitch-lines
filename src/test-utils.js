import generatePitchPatternLines from './generate-pitch-pattern-lines.js'

/**
 * A sample word to use in tests.
 * @type {string}
 * @see wordDecorated
 */
export const word = 'じて¬んしゃ'

/**
 * The same word with generated pitch pattern lines.
 * @type {string}
 * @see word
 */
export const wordDecorated =
  '<span>じ</span><span class="high-pitch">て</span><span>んしゃ</span>'

/**
 * A sample unsupported word with romaji.
 * @type {string}
 */
export const wordInRomaji = 'hiragana'

/**
 * A sample unsupported word with mixed characters.
 * @type {string}
 */
export const wordMixed = 'hiらがa.na'

/**
 * A random HTML tags
 * @type {string}
 */
export const someTags = '<img alt="test" src="test.jpg">'

/**
 * A transliteration's sound element HTML template.
 * @type {string}
 */
export const soundHTMLTemplate =
  `<a class="replay-button soundLink" href="#" onclick="pycmd('play:a:0'); return false;">
    <svg class="playImage" viewBox="0 0 64 64" version="1.1">
        <circle cx="32" cy="32" r="29"></circle>
        <path d="M56.502,32.301l-37.502,20.101l0.329,-40.804l37.173,20.703Z"></path>
    </svg>
  </a>`

/**
 * Compares the result with pitch pattern lines generated for a given input.
 * @param {string} input The input to the pitch pattern generator.
 * @param {string} expected The expected result.
 */
export function compare(input, expected) {
  const actual = generatePitchPatternLines(input)
  expect(actual).toBe(expected)
}
