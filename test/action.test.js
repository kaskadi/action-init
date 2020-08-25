/* eslint-env mocha */
const runAction = require('./helpers/run-action.js')
const steps = ['pre', 'main']
const copyData = require('./helpers/copy-data.js')
const rimraf = require('rimraf')

const folderName = 'working-data'

const testDir = process.cwd()

const args = {
  action: ['template-action', folderName],
  api: ['template-api', folderName],
  element: ['template-element', folderName, 'TemplateElement', 'WorkingData'],
  lambda: ['template-lambda', folderName, 'templateLambda', 'workingData'],
  layer: ['template-layer', folderName, 'templateLayer', 'workingData']
}

describe('action-init', function () {
  // ******* DO NOT REMOVE THIS TEST!
  require('./pre/tests.js')
  // *******
  for (const repoType in args) {
    describe(`${repoType} initialization`, describeHandler(repoType, args[repoType]))
  }
})

function describeHandler (repoType, args) {
  const root = `test/${repoType}-data/`
  const dataPath = `${root}data`
  const workingDataPath = `${root}${folderName}`
  return function () {
    this.timeout(60000)
    before(async () => {
      await copyData(dataPath, workingDataPath)
      process.env.INPUT_REPOTYPE = repoType
      process.chdir(workingDataPath)
      await runAction(steps)
      process.chdir(testDir)
    })
    require(`./${repoType}-data/tests.js`)(root, ...args)
    after(() => {
      rimraf.sync(workingDataPath)
    })
  }
}
