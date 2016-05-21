/**
 * Syntax: es2015 as far as implemented in node.js v4.x.
 */
'use strict'

module.exports = emojiGen

/**
 * Create emoji css from the contents of given dir/glob patterns.
 * @param {string[]} paths The glob patterns
 * @param {object} options The options
 */
function emojiGen(paths, options) {

  const output = options.output
  const emojiClass = options.emojiClass || 'emoji'
  const sizes = options.sizes || [20, 22, 25, 30]
  const defaultSize = options.defaultSize || 22

}
