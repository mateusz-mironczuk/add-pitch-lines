import generatePitchPatternLines from './generate-pitch-pattern-lines.js'

test('empty string when no transliteration', () => {
  compare('', '')
})

function compare(input, expected) {
  const actual = generatePitchPatternLines(input)
  expect(actual).toBe(expected)
}

test('unchanged input when no kana', () => {
  compare('hiragana', 'hiragana')
})

test('お¬おい', () => {
  compare('お¬おい', '<span class="high-pitch">お</span><span>おい</span>')
})

test('しごと', () => {
  compare('しごと', '<span>し</span><span class="high-pitch">ごと</span>')
})

test('みんな¬', () => {
  compare(
    'みんな¬',
    '<span>み</span><span class="high-pitch ends-with-pitch-drop">んな</span>'
  )
})

test('じて¬んしゃ', () => {
  compare(
    'じて¬んしゃ',
    '<span>じ</span><span class="high-pitch">て</span><span>んしゃ</span>'
  )
})

test('おんな¬のこ', () => {
  compare(
    'おんな¬のこ',
    '<span>お</span><span class="high-pitch">んな</span><span>のこ</span>'
  )
})

test('りょこう', () => {
  compare('りょこう', '<span>りょ</span><span class="high-pitch">こう</span>')
})

test('きょ¬ねん', () => {
  compare('きょ¬ねん', '<span class="high-pitch">きょ</span><span>ねん</span>')
})

test('き¬', () => {
  compare('き¬', '<span class="high-pitch">き</span>')
})

test('きょ¬', () => {
  compare('きょ¬', '<span class="high-pitch">きょ</span>')
})

test('き', () => {
  compare('き', '<span>き</span>')
})

test('きょ', () => {
  compare('きょ', '<span>きょ</span>')
})

test('がっこう', () => {
  compare('がっこう', '<span>が</span><span class="high-pitch">っこう</span>')
})

test('ゲ¬ーム', () => {
  compare('ゲ¬ーム', '<span class="high-pitch">ゲ</span><span>ーム</span>')
})

test('レシ¬ート', () => {
  compare(
    'レシ¬ート',
    '<span>レ</span><span class="high-pitch">シ</span><span>ート</span>'
  )
})

