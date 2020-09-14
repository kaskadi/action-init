/* eslint-env mocha */
const runAction = require('./helpers/run-action.js')
const steps = ['pre', 'main']
const copyData = require('./helpers/copy-data.js')
const rimraf = require('rimraf')

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
  // ******* DO NOT REMOVE THIS TEST!
  require('./pre/tests.js')
  // *******
  for (const repoType in args) {
    describe(`${repoType} initialization`, describeHandler(repoType, args[repoType]))
  }
})

function describeHandler (repoType, args) {
  const testDir = `test/${repoType}-data`
  const dataPath = `${testDir}/data`
  const workingDataPath = `${testDir}/${folderName}`
  return function () {
    this.timeout(60000)
    before(async () => {
      await copyData(dataPath, workingDataPath)
      process.env.INPUT_REPOTYPE = repoType
      process.chdir(workingDataPath)
      await runAction(steps)
      process.chdir(wd)
    })
    require(`./${repoType}-data/tests.js`)(testDir, ...args)
    after(() => {
      rimraf.sync(workingDataPath)
    })
  }
}
