const kana = String.raw`[{\p{Script=Hiragana}\p{Script=Katakana}ー]`
const inputRegex = new RegExp(
  '^'
  + `(?<transliteration>${kana}+¬?${kana}*)`
  + '(?<rest>.*)'
  + '$',
  'us'
)
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
 * Decorates a transliteration in a given input with pitch pattern lines.
 * Supports transliterations written entirely in kana with optional pitch
 * drop marker: ¬.
 * @param {string} input The input with the transliteration to decorate.
 * @returns {string} The input with the decorated transliteration.
 */
export default function generatePitchPatternLines(input) {
  const match = input.match(inputRegex)
  return match
    ? generateLines(match.groups.transliteration) + match.groups.rest
    : input
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
  return `<span class="low-pitch">${characters}</span>`
}

function generateHighPitchLine(characters) {
  return `<span class="high-pitch">${characters}</span>`
}

function generateLastPitchDropLine(characters) {
  return `<span class="high-pitch ends-with-pitch-drop">${characters}</span>`
}
