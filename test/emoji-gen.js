const emojiGen = require('../')

const test = require('tape')
const rimraf = require('rimraf')

const path = require('path')
const fs = require('fs')

const fixtureRoot = path.join(__dirname, 'fixture')

test('emojiGen creates emoji css from the given params and returns a exit code', t => {
  emojiGen('test/fixture/**/*.svg', {output: 'test/fixture/site/css/emoji-test.css'}).then(exitCode => {
    t.equal(exitCode, 0, 'The exit code is 0')
    const actual = fs.readFileSync('test/fixture/site/css/emoji-test.css').toString()
    const expected = fs.readFileSync('test/fixture/site/css/emoji.css').toString()

    t.equal(actual, expected, 'It generates the correct css')

    fs.unlinkSync('test/fixture/site/css/emoji-test.css')

    t.end()
  }).catch(err => {
    console.log(err.stack)
    t.fail()
  })
})
