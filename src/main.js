const { getInput, warning, group } = require('@actions/core')
const { spawnSync } = require('child_process')
const kaskadiCLIManager = require('./helpers/kaskadi-cli-manager')
const initRepo = require('./helpers/init-repo.js')
const cleanup = require('./helpers/cleanup.js')
const pushChanges = require('./helpers/push-changes.js')
const addRepo = require('./helpers/add-repo.js')
const addReporterId = require('./helpers/add-reporter-id.js')
const utils = {
  warning,
  fetch: require('./helpers/fetch.js'),
  checkStatus: require('./helpers/check-status.js')
}

async function main () {
  const repo = process.env.GITHUB_REPOSITORY
  await group(`Initializing ${repo} using kaskadi-cli npm package (https://www.npmjs.com/package/kaskadi-cli)`, async () => {
    kaskadiCLIManager(spawnSync, 'i')
    initRepo(spawnSync, getInput('repoType'))
    kaskadiCLIManager(spawnSync, 'rm')
  })
  await group(`Cleaning up and pushing changes to ${repo}`, async () => {
    cleanup(spawnSync)
    pushChanges(spawnSync)
  })
  await group(`Adding ${repo} to Code Climate and setting up CC_REPORTER secret`, async () => {
    await addRepo(utils, repo)
      .then(addReporterId(utils, repo))
      .catch(console.log)
  })
}

main()
