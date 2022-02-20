import addPitchPatternLines from './add-pitch-pattern-lines.js'

test('empty string when no transliteration', () => {
  const actual = addPitchPatternLines('')
  expect(actual)
    .toBe('')
})

test('unchanged input when unsupported characters', () => {
  const transliteration = 'hiらがa.na'
  const actual = addPitchPatternLines(transliteration)
  expect(actual)
    .toBe(transliteration)
})

test.each([
  ['お¬おい', '<span class="high-pitch">お</span><span class="low-pitch">おい</span>'],
  ['しごと', '<span class="low-pitch">し</span><span class="high-pitch">ごと</span>'],
  ['みんな¬', '<span class="low-pitch">み</span><span class="high-pitch ends-with-pitch-drop">んな</span>'],
  ['じて¬んしゃ', '<span class="low-pitch">じ</span><span class="high-pitch">て</span><span class="low-pitch">んしゃ</span>'],
  ['おんな¬のこ', '<span class="low-pitch">お</span><span class="high-pitch">んな</span><span class="low-pitch">のこ</span>'],
  ['りょこう', '<span class="low-pitch">りょ</span><span class="high-pitch">こう</span>'],
  ['きょ¬ねん', '<span class="high-pitch">きょ</span><span class="low-pitch">ねん</span>'],
  ['き¬', '<span class="high-pitch">き</span>'],
  ['きょ¬', '<span class="high-pitch">きょ</span>'],
  ['き', '<span class="low-pitch">き</span>'],
  ['きょ', '<span class="low-pitch">きょ</span>'],
  ['がっこう', '<span class="low-pitch">が</span><span class="high-pitch">っこう</span>'],
  ['ゲ¬ーム', '<span class="high-pitch">ゲ</span><span class="low-pitch">ーム</span>'],
  ['レシ¬ート', '<span class="low-pitch">レ</span><span class="high-pitch">シ</span><span class="low-pitch">ート</span>']
])('added pitch pattern lines to %s', (transliteration, expected) => {
  const actual = addPitchPatternLines(transliteration)
  expect(actual)
    .toBe(expected)
})
