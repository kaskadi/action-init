/* eslint-env mocha */
const fs = require('fs')
const deepEqual = require('deep-equal')
const chai = require('chai')
chai.should()

module.exports = (root, baseName, folderName, baseCamelName, camelName) => {
  it(`should rename all occurences of ${baseName} to ${folderName} in docs/template.md`, () => {
    const file = fs.readFileSync(`${root}/working-data/docs/template.md`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}/validation/docs/template.md`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} and ${baseCamelName} to ${folderName} and ${camelName} in serverless.yml`, () => {
    const file = fs.readFileSync(`${root}/working-data/serverless.yml`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}/validation/serverless.yml`, 'utf8').trim()
    file.should.equal(validationFile)
  })
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
  it(`should rename ${baseName}.js to ${folderName}.js`, () => {
    const baseFile = fs.existsSync(`${root}/working-data/${baseName}.js`)
    const newFile = fs.existsSync(`${root}/working-data/${folderName}.js`)
    baseFile.should.equal(false)
    newFile.should.equal(true)
  })
}
