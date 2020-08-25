const core = require('@actions/core')
const { spawnSync } = require('child_process')
const kaskadiCLIManager = require('./helpers/kaskadi-cli-manager')
const initRepo = require('./helpers/init-repo.js')
const cleanup = require('./helpers/cleanup.js')
const pushChanges = require('./helpers/push-changes.js')
const repoType = core.getInput('repoType')
const test = !process.env.GITHUB_ACTIONS || process.env.GITHUB_REPOSITORY === 'kaskadi/action-init'

kaskadiCLIManager(spawnSync, 'i')
initRepo(spawnSync, repoType)
kaskadiCLIManager(spawnSync, 'rm')
cleanup(spawnSync, test)
pushChanges(spawnSync, test)
