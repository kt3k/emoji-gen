'use strict'

const path = require('path')

/**
 * An emoji entry.
 */
class Emoji {
  /**
   * @param {string} path The path of emoji image
   * @param {EmojiSheet} sheet The emoji sheet
   * @param {string} emojiClass The emoji sheet
   */
  constructor(path, sheet, emojiClass) {
    this.path = path
    this.sheet = sheet
    this.emojiClass = emojiClass
  }

  getSymbol() {
    return path.basename(this.path, path.extname(this.path))
  }

  getRelativePath() {
    return path.relative(this.sheet.dirname(), this.path)
  }

  toString() {
    return template
      .replace('{emojiClass}', this.emojiClass)
      .replace('{emoji}', this.getSymbol())
      .replace('{path}', this.getRelativePath())
  }
}

const template = `.{emojiClass}-{emoji} {
  background-image: url({path});
}`

module.exports = Emoji
