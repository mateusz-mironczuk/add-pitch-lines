const validCharactersRegex = /^[ー¬\p{Script=Hiragana}\p{Script=Katakana}]+$/u
const parserRegex = new RegExp(
  '^'
  + '(?<firstMora>.[ぁぃぅぇぉゃゅょァィゥェォャュョ]?)'
  + '(?<pitchDropAfterFirstMora>¬)?'
  + '(?<middle>[^¬]+)??¬?'
  + '(?<rest>[^¬]+)?'
  + '(?<pitchDropAfterLastMora>¬)?'
  + '$',
  'u'
)

/**
 * Decorates a transliteration with pitch pattern lines.
 * Supports transliterations written entirely in kana with optional pitch
 * drop marker: ¬.
 * @param {string} transliteration The transliteration to decorate.
 * @returns {string} Decorated transliteration.
 */
export default function generatePitchPatternLines(transliteration) {
  return isValidInput(transliteration)
    ? generateLines(transliteration)
    : transliteration
}

function isValidInput(input) {
  return typeof input === 'string'
    && input.length > 0
    && validCharactersRegex.test(input)
}

function generateLines(transliteration) {
  const { groups } = transliteration.match(parserRegex)
  return hasThreeParts(groups)
    ? generateHTMLForThreeParts(groups)
    : hasTwoParts(groups)
      ? generateHTMLForTwoParts(groups)
      : generateHTMLForOnePart(groups)
}

function hasThreeParts(groups) {
  return groups.middle && groups.rest
}

function generateHTMLForThreeParts(groups) {
  const { firstMora, middle, rest } = groups
  return generateLowPitchLine(firstMora)
    + generateHighPitchLine(middle)
    + generateLowPitchLine(rest)
}

function hasTwoParts(groups) {
  return !groups.middle && groups.rest
}

function generateHTMLForTwoParts(groups) {
  const { firstMora, rest } = groups
  const { pitchDropAfterFirstMora, pitchDropAfterLastMora } = groups
  return pitchDropAfterLastMora
    ? generateLowPitchLine(firstMora) + generateLastPitchDropLine(rest)
    : pitchDropAfterFirstMora
      ? generateHighPitchLine(firstMora) + generateLowPitchLine(rest)
      : generateLowPitchLine(firstMora) + generateHighPitchLine(rest)
}

function generateHTMLForOnePart(groups) {
  const { firstMora, pitchDropAfterFirstMora } = groups
  return pitchDropAfterFirstMora
    ? generateHighPitchLine(firstMora)
    : generateLowPitchLine(firstMora)
}

function generateLowPitchLine(characters) {
  return `<span>${characters}</span>`
}

function generateHighPitchLine(characters) {
  return `<span class="high-pitch">${characters}</span>`
}

function generateLastPitchDropLine(characters) {
  return `<span class="high-pitch ends-with-pitch-drop">${characters}</span>`
}
