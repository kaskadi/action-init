/* eslint-env mocha */
const fs = require('fs')
const deepEqual = require('deep-equal')
const chai = require('chai')
chai.should()

module.exports = (root, baseName, folderName, baseCamelName, camelName) => {
  it(`should rename all occurences of ${baseName} to ${folderName} in package.json`, () => {
    const pjson = JSON.parse(fs.readFileSync(`${root}/working-data/package.json`, 'utf8'))
    const pjsonValid = JSON.parse(fs.readFileSync(`${root}/validation/package.json`, 'utf8'))
    const test = deepEqual(pjson, pjsonValid)
    test.should.equal(true)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in package-lock.json`, () => {
    const pjson = JSON.parse(fs.readFileSync(`${root}/working-data/package-lock.json`, 'utf8'))
    const pjsonValid = JSON.parse(fs.readFileSync(`${root}/validation/package-lock.json`, 'utf8'))
    const test = deepEqual(pjson, pjsonValid)
    test.should.equal(true)
  })
}
