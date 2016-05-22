const util = require('../lib/util')

const test = require('tape')

const path = require('path')

const fixtureRoot = path.join(__dirname, 'fixture')

test('util.unique makes the array contents unique', t => {
  t.deepEqual(util.unique([1, 1, 2, 3, 2, 3, 1]), [1, 2, 3], 'The contents are unique.')
  t.end()
})

test('util.globP returns a promise of globbed paths', t => {
  const promise = util.globP('test/fixture/**/*.svg').then(paths => {
    t.deepEqual(paths, [
      'test/fixture/site/img/bar.svg',
      'test/fixture/site/img/baz.svg',
      'test/fixture/site/img/foo.svg'
    ], 'It resolves with globbed paths.')

    t.end()
  })

  t.ok(promise instanceof Promise, 'It returns a promise.')
})

test('util.getAbsPathsFromGlobs returns a promise of globbed absolute paths', t => {
  const promise = util.getAbsPathsFromGlobs([
    'test/fixture/**/*.svg',
    'test/fixture/**/*.css'
  ]).then(paths => {
    t.deepEqual(paths, [
      `${fixtureRoot}/site/img/bar.svg`,
      `${fixtureRoot}/site/img/baz.svg`,
      `${fixtureRoot}/site/img/foo.svg`,
      `${fixtureRoot}/site/css/emoji.css`
    ])
    t.end()
  })

  t.ok(promise instanceof Promise, 'It returns a promise.')
})
