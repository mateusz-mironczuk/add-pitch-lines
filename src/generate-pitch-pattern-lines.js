const validCharactersRegex = /[-¬\p{Script=Hiragana}\p{Script=Katakana}]/u
const parserRegex = new RegExp(
  '^'
  + '(?<firstMora>.[ぁぃぅぇぉゃゅょァィゥェォャュョ]?)'
  + '(?<pitchDropAfterFirstMora>¬)?'
  + '(?<middle>[^¬]+)??¬?'
  + '(?<rest>[^¬]+)?'
  + '(?<pitchDropAfterLastMora>¬)?'
  + '$'
  , 'u'
)

/**
 * Decorates a transliteration with pitch pattern lines.
 * Supports transliterations written entirely in kana with optional pitch
 * drop marker: ¬.
 * @param {string} transliteration The transliteration to decorate.
 * @throws {Error} If the transliteration is not valid or empty.
 * @returns {string} Decorated transliteration.
 */
export default function generatePitchPatternLines(transliteration) {
  if (isValidInput(transliteration)) {
    return generateLines(transliteration)
  } else {
    throw new Error('Invalid input.')
  }
}

function isValidInput(input) {
  const hasValidCharacters = validCharactersRegex.test(input)
  return typeof input === 'string'
    && input.length > 0
    && hasValidCharacters
}

function generateLines(transliteration) {
  const { groups } = transliteration.match(parserRegex)
  return hasThreeParts(groups)
    ? getHTMLForThreeParts(groups)
    : hasTwoParts(groups)
      ? getHTMLForTwoParts(groups)
      : getHTMLForOnePart(groups)
}

function hasThreeParts(groups) {
  return groups.middle && groups.rest
}

function getHTMLForThreeParts(groups) {
  const { firstMora, middle, rest } = groups
  return lowPitch(firstMora) + highPitch(middle) + lowPitch(rest)
}

function hasTwoParts(groups) {
  return !groups.middle && groups.rest
}

function getHTMLForTwoParts(groups) {
  const { firstMora, rest } = groups
  const { pitchDropAfterFirstMora, pitchDropAfterLastMora } = groups
  return pitchDropAfterLastMora
    ? lowPitch(firstMora) + endsWithPitchDrop(rest)
    : pitchDropAfterFirstMora
      ? highPitch(firstMora) + lowPitch(rest)
      : lowPitch(firstMora) + highPitch(rest)
}

function getHTMLForOnePart(groups) {
  const { firstMora, pitchDropAfterFirstMora } = groups
  return pitchDropAfterFirstMora
    ? highPitch(firstMora)
    : lowPitch(firstMora)
}

function lowPitch(characters) {
  return `<span>${characters}</span>`
}

function highPitch(characters) {
  return `<span class="high-pitch">${characters}</span>`
}

function endsWithPitchDrop(characters) {
  return `<span class="high-pitch ends-with-pitch-drop">${characters}</span>`
}
