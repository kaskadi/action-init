const core = require('@actions/core')
const { spawnSync } = require('child_process')
const kaskadiCLIManager = require('./helpers/kaskadi-cli-manager')
const initRepo = require('./helpers/init-repo.js')
const cleanup = require('./helpers/cleanup.js')
const pushChanges = require('./helpers/push-changes.js')
const addRepo = require('./helpers/add-repo.js')
const addReporterId = require('./helpers/add-reporter-id.js')
const utils = {
  fetch: require('./helpers/fetch.js'),
  checkStatus: require('./helpers/check-status.js')
}

async function main () {
  kaskadiCLIManager(spawnSync, 'i')
  initRepo(spawnSync, core.getInput('repoType'))
  kaskadiCLIManager(spawnSync, 'rm')
  cleanup(spawnSync)
  pushChanges(spawnSync)
  const repo = process.env.GITHUB_REPOSITORY
  await addRepo(utils, repo)
    .then(addReporterId(utils, repo))
    .catch(console.log)
}

main()
