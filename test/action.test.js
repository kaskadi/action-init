/* eslint-env mocha */
require('dotenv').config({ path: `${process.cwd()}/test/.env` })
const runAction = require('./helpers/run-action.js')
const { spawn } = require('child_process')
const steps = ['pre', 'main']
const copyData = require('./helpers/copy-data.js')
const rimraf = require('rimraf')
const should = require('chai').should()
const { readFileSync } = require('fs')

const folderName = 'working-data'

const wd = process.cwd()

const args = {
  action: ['template-action', folderName],
  api: ['template-api', folderName],
  element: ['template-element', folderName, 'TemplateElement', 'WorkingData'],
  lambda: ['template-lambda', folderName, 'templateLambda', 'workingData'],
  layer: ['template-layer', folderName, 'templateLayer', 'workingData'],
  package: ['template-npm-pkg', folderName]
}

describe('action-init', function () {
  this.timeout(30000)
  // ******* DO NOT REMOVE THIS TEST!
  require('./pre/tests.js')
  // *******
  let servProc
  let servOutput
  const outputPath = require('path').join(__dirname, 'server-output.json')
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
  describe('missing token', describeHandler('action', args.action, () => {
    it('should not send requests to GitHub and Code Climate API if no Code Climate token is provided', () => {
      servOutput = readServerOutput(outputPath)
      should.not.exist(servOutput.GITHUB_API_CALL)
      should.not.exist(servOutput.REPO_PUBLIC)
      should.not.exist(servOutput.CC_API_CALL)
      process.env.CC_TOKEN = 'abc'
      process.env.GITHUB_REPOSITORY = 'hello/world'
    })
  }))
  describe('no repo/repo private', describeHandler('action', args.action, () => {
    it('should send a request to GitHub but not Code Climate if token is defined and repository does not exist/is private', () => {
      servOutput = readServerOutput(outputPath)
      servOutput.GITHUB_API_CALL.should.equal(true)
      servOutput.REPO_PUBLIC.should.equal(false)
      should.not.exist(servOutput.CC_API_CALL)
      process.env.GITHUB_REPOSITORY = 'test/test'
    })
  }))
  describe('public repo', describeHandler('action', args.action, () => {
    it('should send a request to GitHub and Code Climate if token is defined and repository is public', () => {
      servOutput = readServerOutput(outputPath)
      servOutput.GITHUB_API_CALL.should.equal(true)
      servOutput.REPO_PUBLIC.should.equal(true)
      servOutput.CC_API_CALL.should.equal(true)
      delete process.env.CC_TOKEN
      delete process.env.GITHUB_REPOSITORY
    })
  }))
  after(done => {
    servProc.on('exit', (code) => {
      done()
    })
    servProc.kill()
  })
})

function readServerOutput (outputPath) {
  return JSON.parse(readFileSync(outputPath, 'utf8'))
}

function describeHandler (repoType, args, postRunTests) {
  const testDir = `test/${repoType}-data`
  const dataPath = `${testDir}/data`
  const workingDataPath = `${testDir}/${folderName}`
  return function () {
    this.timeout(120000)
    before(async () => {
      await copyData(dataPath, workingDataPath)
      process.env.INPUT_REPOTYPE = repoType
      process.chdir(workingDataPath)
      await runAction(steps)
      process.chdir(wd)
    })
    if (postRunTests) {
      postRunTests()
    } else {
      require(`./${repoType}-data/tests.js`)(testDir, ...args)
    }
    after(() => {
      rimraf.sync(workingDataPath)
    })
  }
}
