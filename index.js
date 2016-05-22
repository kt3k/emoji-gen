/**
 * Syntax: es2015 as far as implemented in node.js v4.x.
 */
'use strict'

const Emoji = require('./lib/emoji')
const EmojiSheet = require('./lib/emoji-sheet')

const glob = require('glob')
const mkdirp = require('mkdirp')
const colo = require('colo')

const path = require('path')
const fs = require('fs')

/**
 * Create emoji css from the contents of given dir/glob patterns.
 * @param {string[]} paths The glob patterns
 * @param {object} options The options
 * @return {Promise<number>}
 */
const emojiGen = (paths, options) => {
  let output = options.output
  const emojiClass = options.emojiClass || 'emoji'
  const sizes = options.sizes || [20, 22, 25, 30]
  const defaultSize = options.defaultSize || 22

  output = path.join(process.cwd(), output)

  const sheet = new EmojiSheet(output, emojiClass, sizes, defaultSize)

  return getAbsPaths(paths).then(paths => {
    paths.map(filename => sheet.addEmoji(new Emoji(filename, sheet, emojiClass)))

    mkdirp.sync(sheet.dirname())
    console.log(colo.green('writing to the file ' + sheet.outputPath))
    fs.writeFileSync(sheet.outputPath, sheet.toString())
    console.log(colo.green('success'))

    return 0 // exit code
  })

}

/**
 * Gets the absolute paths.
 * @param {string[]} paths The glob patterns
 * @return {Promise<string[]>}
 */
const getAbsPaths = paths => Promise.all(paths.map(globP)).then(arraysOfFiles => {
  let files = [].concat.apply([], arraysOfFiles)

  files = uniq(files)

  return files.map(file => path.join(process.cwd(), file))
})

/**
 * Returns globbed files by the given pattern. Returns a promise.
 * @param {string} path The glob
 * @return {Promise}
 */
const globP = path => new Promise(resolve => glob(path, (err, files) => err ? reject(err) : resolve(files)))

const uniq = arr => {
  const res = []

  arr.forEach(item => res.indexOf(item) === -1 ? res.push(item) : null)

  return res
}

module.exports = emojiGen
