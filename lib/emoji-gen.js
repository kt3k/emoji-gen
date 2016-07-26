/**
 * Syntax: es2015 as far as implemented in node.js v4.x.
 */
'use strict'

const EmojiSheet = require('./domain/emoji-sheet')
const util = require('./util')

const mkdirp = require('mkdirp')

const path = require('path')
const fs = require('fs')

/**
 * Create emoji css from the contents of given dir/glob patterns and returns a promise of the generated css file path.
 * @param {string|string[]} paths The glob patterns
 * @param {object} options The options
 * @return {Promise<string>}
 */
const emojiGen = (paths, options) => {
  if (typeof paths === 'string') {
    paths = [paths]
  }

  let output = options.output
  const emojiClass = options.emojiClass || 'emoji'
  const sizes = options.sizes || [20, 22, 25, 30]
  const defaultSize = options.defaultSize || 22

  output = path.join(process.cwd(), output)

  return util.getAbsPathsFromGlobs(paths).then(paths => {
    const sheet = EmojiSheet.createFromPathsAndOptions(paths, {
      output, emojiClass, sizes, defaultSize
    })

    mkdirp.sync(sheet.dirname())

    fs.writeFileSync(sheet.outputPath, sheet.toString())

    return sheet.outputPath
  })
}

module.exports = emojiGen
