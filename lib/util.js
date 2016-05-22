'use strict'

const glob = require('glob')
const path = require('path')

/**
 * Gets the absolute paths from the given glob patterns.
 * @param {string[]} paths The glob patterns
 * @return {Promise<string[]>}
 */
exports.getAbsPathsFromGlobs = paths => Promise.all(paths.map(exports.globP)).then(arraysOfFiles => {
  let files = [].concat.apply([], arraysOfFiles)

  files = exports.unique(files)

  return files.map(file => path.join(process.cwd(), file))
})

/**
 * Returns globbed files by the given pattern. Returns a promise.
 * @param {string} path The glob
 * @return {Promise}
 */
exports.globP = path => new Promise(resolve => glob(path, (err, files) => err ? reject(err) : resolve(files)))

/**
 * Makes the given array contents unique.
 * @param {object[]} arr
 * @return {object[]}
 */
exports.unique = arr => {
  const res = []

  arr.forEach(item => res.indexOf(item) === -1 ? res.push(item) : null)

  return res
}
