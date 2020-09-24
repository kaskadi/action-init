/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const { spawnSync } = require('child_process')
const { writeFileSync } = require('fs')
const chai = require('chai')
const { assert } = require('chai')
chai.should()

const pjson = require('../../package.json')
const pkgDependencies = Object.keys(pjson.dependencies || {})

describe('pre step', function () {
  this.timeout(30000)
  beforeEach(function () {
    console.log('TEST INFO: removing dependencies before testing')
    const tempPjson = { ...pjson }
    delete tempPjson.dependencies
    delete tempPjson.devDependencies
    writeFileSync('../../package.json', JSON.stringify(tempPjson, null, 2), 'utf8')
    spawnSync('npm', ['i'], { stdio: 'inherit' })
    writeFileSync('../../package.json', JSON.stringify(pjson, null, 2), 'utf8')
  })
  it('should install the action dependencies when ran from action folder', async function () {
    await test()
  })
  it('should install the action dependencies when ran from another folder', async function () {
    process.chdir('test')
    await test()
    process.chdir('..')
  })
  afterEach(function () {
    console.log('TEST INFO: installing all dependencies again')
    spawnSync('npm', ['i'], { stdio: 'inherit' })
  })
})

async function test () {
  await runAction(['pre'])
  const dependencies = pkgDependencies.map(key => require(key))
  assert(dependencies.filter(dep => dep).length === dependencies.length, 'Dependencies not properly installed...')
}
