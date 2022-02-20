import addPitchPatternLinesToElement from './add-pitch-pattern-lines-to-element.js'
import domCompare from 'dom-compare'
import { parseHTML } from './utils.js'

const transliteration = 'お¬おい'
const transliterationWithLines = '<span class="high-pitch">お</span><span class="low-pitch">おい</span>'
const someHTML = `<div>${transliteration}</div>`
const soundHTML =
  `<a class="replay-button soundLink" href="#" onclick="pycmd('play:a:0'); return false;">
    <svg class="playImage" viewBox="0 0 64 64" version="1.1">
        <circle cx="32" cy="32" r="29"></circle>
        <path d="M56.502,32.301l-37.502,20.101l0.329,-40.804l37.173,20.703Z"></path>
    </svg>
  </a>`

test('unchanged when no direct child text nodes', () => {
  const html = `${someHTML}${someHTML}`
  const body = parseHTML(html).body
  addPitchPatternLinesToElement(body)
  const expected = parseHTML(html).body
  const comparisonResult = domCompare
    .compare(body, expected)
    .getResult()
  expect(comparisonResult)
    .toBeTruthy()
})

test('updated when the only child note is text node', () => {
  const html = transliteration
  const body = parseHTML(html).body
  addPitchPatternLinesToElement(body)
  const expectedHTML = transliterationWithLines
  const expected = parseHTML(expectedHTML).body
  const comparisonResult = domCompare
    .compare(body, expected)
    .getResult()
  expect(comparisonResult)
    .toBeTruthy()
})

test('updated when element before', () => {
  const html = `${someHTML}${transliteration}`
  const body = parseHTML(html).body
  addPitchPatternLinesToElement(body)
  const expectedHTML = `${someHTML}${transliterationWithLines}`
  const expected = parseHTML(expectedHTML).body
  const comparisonResult = domCompare
    .compare(body, expected)
    .getResult()
  expect(comparisonResult)
    .toBeTruthy()
})

test('updated when element after', () => {
  const html = `${transliteration}${soundHTML}`
  const body = parseHTML(html).body
  addPitchPatternLinesToElement(body)
  const expectedHTML = `${transliterationWithLines}${soundHTML}`
  const expected = parseHTML(expectedHTML).body
  const comparisonResult = domCompare
    .compare(body, expected)
    .getResult()
  expect(comparisonResult)
    .toBeTruthy()
})

test('updated when text node between elements', () => {
  const html = `${someHTML}${transliteration}${soundHTML}`
  const body = parseHTML(html).body
  addPitchPatternLinesToElement(body)
  const expectedHTML = `${someHTML}${transliterationWithLines}${soundHTML}`
  const expected = parseHTML(expectedHTML).body
  const comparisonResult = domCompare
    .compare(body, expected)
    .getResult()
  expect(comparisonResult)
    .toBeTruthy()
})

test('updated all when multiple text nodes', () => {
  const html = `${someHTML}${transliteration}${soundHTML}${transliteration}${someHTML}`
  const body = parseHTML(html).body
  addPitchPatternLinesToElement(body)
  const expectedHTML = `${someHTML}${transliterationWithLines}${soundHTML}${transliterationWithLines}${someHTML}`
  const expected = parseHTML(expectedHTML).body
  const comparisonResult = domCompare
    .compare(body, expected)
    .getResult()
  expect(comparisonResult)
    .toBeTruthy()
})

