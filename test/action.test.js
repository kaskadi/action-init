/* eslint-env mocha */
require('dotenv').config({ path: `${process.cwd()}/test/.env` })
const runAction = require('./helpers/run-action.js')
const { spawn } = require('child_process')
const steps = ['pre', 'main']
const copyData = require('./helpers/copy-data.js')
const rimraf = require('rimraf')

const folderName = 'working-data'

const wd = process.cwd()

const args = {
  action: ['template-action', folderName]
  // api: ['template-api', folderName],
  // element: ['template-element', folderName, 'TemplateElement', 'WorkingData'],
  // lambda: ['template-lambda', folderName, 'templateLambda', 'workingData'],
  // layer: ['template-layer', folderName, 'templateLayer', 'workingData'],
  // package: ['template-npm-pkg', folderName]
}

describe('action-init', function () {
  this.timeout(30000)
  // ******* DO NOT REMOVE THIS TEST!
  // require('./pre/tests.js')
  // *******
  let servProc
  before(done => {
    servProc = spawn('node', ['test/test-server.js'])
    servProc.stdout.on('data', (data) => {
      data = data.toString()
      console.log(data)
      if (data.includes('READY')) {
        done()
      }
    })
    servProc.stderr.on('data', (data) => {
      console.error(data.toString())
    })
    servProc.on('exit', (code) => {
      console.log(`Server exited with code ${code}`)
    })
  })
  for (const repoType in args) {
    describe(`${repoType} initialization`, describeHandler(repoType, args[repoType]))
  }
  after(done => {
    servProc.on('exit', (code) => {
      done()
    })
    servProc.kill()
  })
})

function describeHandler (repoType, args, postRunTests = () => {}) {
  const testDir = `test/${repoType}-data`
  const dataPath = `${testDir}/data`
  const workingDataPath = `${testDir}/${folderName}`
  return function () {
    this.timeout(120000)
    before(async () => {
      await copyData(dataPath, workingDataPath)
      process.env.INPUT_REPOTYPE = repoType
      process.chdir(workingDataPath)
      await runAction(steps).then(postRunTests)
      process.chdir(wd)
    })
    require(`./${repoType}-data/tests.js`)(testDir, ...args)
    after(() => {
      rimraf.sync(workingDataPath)
    })
  }
}
