#!/usr/bin/env node
'use strict'

const argv = require('minimist')(process.argv.slice(2))
const emojiGen = require('../')
const colo = require('colo') // use colo instead of chalk

const helpMessage = `

  Usage: emoji-gen [paths, ...] -o [output path] [other options]

  Options:
     -h, --help            Show this help message.
     -v, --version         Show the version of the command.
     -o, --output [path]   The output css file path. This is required.
     --class [name]        The name of emoji css class. Default is 'emoji'.
     --sizes [size,...]    The comma separated values of sizes of generated css classes.
                           Default is '20,22,25,30'.
     --default-size [size] The value of the size of the default emoji class.
                           Default is '22'.

  Example: emoji-gen 'site/img/**/*' -o site/css/emoji.css
`.replace(/^\s/, '')

/**
 * The main function of cli.
 * @param {object} argv minimist-parsed options object
 */
const main = argv => {
  const isHelp = argv.h || argv.help
  const isVersion = argv.v || argv.version
  const output = argv.o || argv.output
  const paths = argv._
  const sizes = typeof argv.size === 'string' ? argv.size.split(',') : null
  const defaultSize = argv.defaultSize
  const emojiClass = argv.class

  if (isHelp) {
    console.log(helpMessage)
    process.exit(0)
  }

  if (isVersion) {
    const pkg = require('../package')
    console.log('emoji-gen', pkg.version)
    process.exit(0)
  }

  if (typeof output === 'undefined' || typeof output === 'boolean') {
    console.log(colo.red('Error: -o [output] option is missing'))
    process.exit(1)
  }

  if (paths.length === 0) {
    console.log(colo.red('No file patterns specified'))
    process.exit(1)
  }

  emojiGen(paths, {output, emojiClass, sizes, defaultSize}).then(generatedPath => {
    console.log(colo.green('Generated emoji css file at: ' + generatedPath))
    process.exit(0)
  }).catch(err => {
    console.log(colo.red(err.stack))
    process.exit(1)
  })
}

main(argv)
