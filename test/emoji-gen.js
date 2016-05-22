const emojiGen = require('../')

const test = require('tape')

const path = require('path')
const fs = require('fs')

const fixtureRoot = path.join(__dirname, 'fixture')

test('emojiGen creates emoji css from the given params and returns a exit code', t => {
  emojiGen('test/fixture/**/*.svg', {output: 'test/fixture/site/css/emoji-test.css'}).then(generatedPath => {
    t.equal(generatedPath, `${fixtureRoot}/site/css/emoji-test.css`, 'It returns abs path of generated css.')

    const actual = fs.readFileSync(generatedPath).toString()
    const expected = fs.readFileSync('test/fixture/site/css/emoji.css').toString()

    t.equal(actual, expected, 'It generates the correct css')

    fs.unlinkSync(generatedPath)

    t.end()
  }).catch(err => {
    console.log(err.stack)
    t.fail()
  })
})

test('emojiGen handles multiple glob patterns', t => {
  emojiGen([
    'test/fixture/site/img/bar.svg',
    'test/fixture/site/img/baz.svg',
    'test/fixture/site/img/foo.svg'
  ], {output: 'test/fixture/site/css/emoji-test.css'}).then(generatedPath => {
    t.equal(generatedPath, `${fixtureRoot}/site/css/emoji-test.css`, 'It returns abs path of generated css.')

    const actual = fs.readFileSync(generatedPath).toString()
    const expected = fs.readFileSync('test/fixture/site/css/emoji.css').toString()

    t.equal(actual, expected, 'It generates the correct css')

    fs.unlinkSync(generatedPath)

    t.end()
  }).catch(err => {
    console.log(err.stack)
    t.fail()
  })
})
