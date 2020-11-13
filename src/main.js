const core = require('@actions/core')
const { spawnSync } = require('child_process')
const kaskadiCLIManager = require('./helpers/kaskadi-cli-manager')
const initRepo = require('./helpers/init-repo.js')
const cleanup = require('./helpers/cleanup.js')
const pushChanges = require('./helpers/push-changes.js')
const addRepo = require('./helpers/add-repo.js')

const repoType = core.getInput('repoType')

async function main () {
  kaskadiCLIManager(spawnSync, 'i')
  initRepo(spawnSync, repoType)
  kaskadiCLIManager(spawnSync, 'rm')
  cleanup(spawnSync)
  pushChanges(spawnSync)
  if (!process.env.TEST_ENV) {
    await addRepo()
  }
}

main()
