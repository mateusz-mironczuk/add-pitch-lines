import {
  compare,
  someTags,
  soundHTMLTemplate,
  word,
  wordDecorated,
  wordInRomaji,
  wordMixed
} from './test-utils.js'

test('empty string when no transliteration', () => {
  compare('', '')
})

test('unchanged input when no kana', () => {
  compare(wordInRomaji, wordInRomaji)
})

test('unchanged input when kana mixed with unsupported characters', () => {
  compare(wordMixed, wordMixed)
})

test('unchanged when no transliteration and sound', () => {
  const before = soundHTMLTemplate
  compare(before, before)
})

test('unchanged when no kana and sound', () => {
  const before = wordInRomaji + soundHTMLTemplate
  compare(before, before)
})

test('unchanged when kana mixed with unsupported characters and sound', () => {
  const before = wordMixed + soundHTMLTemplate
  compare(before, before)
})

test('unchanged when no transliteration and other tags', () => {
  const before = someTags
  compare(before, before)
})

test('unchanged when transliteration in the middle', () => {
  const before = soundHTMLTemplate + word + soundHTMLTemplate
  compare(before, before)
})

test('unchanged when transliteration at the end', () => {
  const before = soundHTMLTemplate + word
  compare(before, before)
})

test('お¬おい', () => {
  compare(
    'お¬おい',
    '<span class="high-pitch">お</span><span class="low-pitch">おい</span>'
  )
})

test('しごと', () => {
  compare(
    'しごと',
    '<span class="low-pitch">し</span><span class="high-pitch">ごと</span>'
  )
})

test('みんな¬', () => {
  compare(
    'みんな¬',
    '<span class="low-pitch">み</span><span class="high-pitch ends-with-pitch-drop">んな</span>'
  )
})

test('じて¬んしゃ', () => {
  compare(
    'じて¬んしゃ',
    '<span class="low-pitch">じ</span><span class="high-pitch">て</span><span class="low-pitch">んしゃ</span>'
  )
})

test('おんな¬のこ', () => {
  compare(
    'おんな¬のこ',
    '<span class="low-pitch">お</span><span class="high-pitch">んな</span><span class="low-pitch">のこ</span>'
  )
})

test('りょこう', () => {
  compare(
    'りょこう',
    '<span class="low-pitch">りょ</span><span class="high-pitch">こう</span>'
  )
})

test('きょ¬ねん', () => {
  compare(
    'きょ¬ねん',
    '<span class="high-pitch">きょ</span><span class="low-pitch">ねん</span>'
  )
})

test('き¬', () => {
  compare('き¬', '<span class="high-pitch">き</span>')
})

test('きょ¬', () => {
  compare('きょ¬', '<span class="high-pitch">きょ</span>')
})

test('き', () => {
  compare('き', '<span class="low-pitch">き</span>')
})

test('きょ', () => {
  compare('きょ', '<span class="low-pitch">きょ</span>')
})

test('がっこう', () => {
  compare(
    'がっこう',
    '<span class="low-pitch">が</span><span class="high-pitch">っこう</span>'
  )
})

test('ゲ¬ーム', () => {
  compare(
    'ゲ¬ーム',
    '<span class="high-pitch">ゲ</span><span class="low-pitch">ーム</span>'
  )
})

test('レシ¬ート', () => {
  compare(
    'レシ¬ート',
    '<span class="low-pitch">レ</span><span class="high-pitch">シ</span><span class="low-pitch">ート</span>'
  )
})

test('decorated when sound', () => {
  compare(
    word + soundHTMLTemplate,
    wordDecorated + soundHTMLTemplate
  )
})

test('decorated when some tags after', () => {
  compare(
    word + someTags,
    wordDecorated + someTags
  )
})
