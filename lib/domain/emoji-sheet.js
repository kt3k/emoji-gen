'use strict'
const Emoji = require('./emoji')

const path = require('path')

/**
 * This class represents the output stylesheet.
 */
class EmojiSheet {
  /**
   * @param {string[]} paths The absolute paths of emoji images
   * @param {object} options The options
   * @return {EmojiSheet}
   */
  static createFromPathsAndOptions (paths, options) {
    const sheet = new EmojiSheet(options.output, options.emojiClass, options.sizes, options.defaultSize)

    paths.forEach(filename => sheet.addEmoji(new Emoji(filename, sheet, sheet.emojiClass)))

    return sheet
  }

  /**
   * @param {string} outputPath The output path
   * @param {string} emojiClass The emoji class prefix
   * @param {number[]} sizes The sizes of emoji classes
   * @param {number} defaultSize The default size of emoji class
   */
  constructor (outputPath, emojiClass, sizes, defaultSize) {
    this.outputPath = outputPath
    this.emojis = []
    this.emojiClass = emojiClass
    this.sizes = sizes
    this.defaultSize = defaultSize
  }

  /**
   * @param {Emoji} emoji The emoji entry
   */
  addEmoji (emoji) {
    this.emojis.push(emoji)
  }

  /**
   * Returns the dirname of the output file.
   * @return {string}
   */
  dirname () {
    return path.dirname(this.outputPath)
  }

  /**
   * Returns the stylesheet.
   * @return {string}
   */
  toString () {
    return this.toStringDefaultSizeClass() + '\n\n' + this.toStringSizedClasses() + '\n\n' + this.toStringEmojiClasses() + '\n'
  }

  templateEmojiClass (size, isDefault) {
    const dash = isDefault ? '' : '-'
    const sizeLabel = isDefault ? '' : size
    return template
      .replace('{emojiClass}', this.emojiClass)
      .replace('{-}', dash)
      .replace('{sizeLabel}', sizeLabel)
      .replace(/{size}/g, size)
  }

  /**
   * Returns the stylesheet of default sized emoji class.
   */
  toStringDefaultSizeClass () {
    return this.templateEmojiClass(this.defaultSize, true)
  }

  /**
   * Returns the stylesheet of sized emoji classes.
   * @return {string}
   */
  toStringSizedClasses () {
    return this.sizes.map(size => this.templateEmojiClass(size, false)).join('\n\n')
  }

  /**
   * Returns the stylesheet of emoji image classes.
   * @return {string}
   */
  toStringEmojiClasses () {
    return this.emojis.map(emoji => emoji.toString()).join('\n\n')
  }
}

const template = `.{emojiClass}{-}{sizeLabel} {
  background-size: {size}px {size}px;
  color: transparent;
  display: inline-block;
  vertical-align: middle;
  width: {size}px;
  height: {size}px;
}`

module.exports = EmojiSheet
