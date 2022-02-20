const kana = String.raw`[{\p{Script=Hiragana}\p{Script=Katakana}ー]`
const transliterationRegex = new RegExp(`^${kana}+¬?${kana}*$`, 'u')
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
 * Decorates a given transliteration with pitch pattern lines.
 * Supports transliterations written entirely in kana with optional pitch
 * drop marker: ¬.
 * @param {string} transliteration The transliteration to decorate.
 * @returns {string} The decorated transliteration.
 */
export default function addPitchPatternLines(transliteration) {
  return transliterationRegex.test(transliteration)
    ? addLines(transliteration)
    : transliteration
}

function addLines(transliteration) {
  const { groups } = transliteration.match(parserRegex)
  return hasThreeParts(groups)
    ? addLinesForThreeParts(groups)
    : hasTwoParts(groups)
      ? addLinesForTwoParts(groups)
      : addLinesForOnePart(groups)
}

function hasThreeParts(groups) {
  return groups.middle && groups.rest
}

function addLinesForThreeParts(groups) {
  const { firstMora, middle, rest } = groups
  return addLowPitchLine(firstMora)
    + addHighPitchLine(middle)
    + addLowPitchLine(rest)
}

function hasTwoParts(groups) {
  return !groups.middle && groups.rest
}

function addLinesForTwoParts(groups) {
  const { firstMora, rest } = groups
  const { pitchDropAfterFirstMora, pitchDropAfterLastMora } = groups
  return pitchDropAfterLastMora
    ? addLowPitchLine(firstMora) + addLastPitchDropLine(rest)
    : pitchDropAfterFirstMora
      ? addHighPitchLine(firstMora) + addLowPitchLine(rest)
      : addLowPitchLine(firstMora) + addHighPitchLine(rest)
}

function addLinesForOnePart(groups) {
  const { firstMora, pitchDropAfterFirstMora } = groups
  return pitchDropAfterFirstMora
    ? addHighPitchLine(firstMora)
    : addLowPitchLine(firstMora)
}

function addLowPitchLine(characters) {
  return `<span class="low-pitch">${characters}</span>`
}

function addHighPitchLine(characters) {
  return `<span class="high-pitch">${characters}</span>`
}

function addLastPitchDropLine(characters) {
  return `<span class="high-pitch ends-with-pitch-drop">${characters}</span>`
}
