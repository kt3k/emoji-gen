/**
 * Syntax: es2015 as far as implemented in node.js v4.x.
 */
'use strict'

const Emoji = require('./domain/emoji')
const EmojiSheet = require('./domain/emoji-sheet')
const util = require('./util')

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

  return util.getAbsPathsFromGlobs(paths).then(paths => {
    const sheet = EmojiSheet.createFromPathsAndOptions(paths, {
      output, emojiClass, sizes, defaultSize
    })

    mkdirp.sync(sheet.dirname())

    console.log(colo.green('writing to the file ' + sheet.outputPath))
    fs.writeFileSync(sheet.outputPath, sheet.toString())

    console.log(colo.green('success'))

    return 0 // exit code
  })

}

module.exports = emojiGen
