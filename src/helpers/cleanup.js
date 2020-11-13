const gitOp = require('./git-op.js')

module.exports = (spawnSync) => {
  console.log('INFO: removing init workflow from repository...')
  gitOp(spawnSync, 'rm', ['.github/workflows/init.yml'])
  console.log('SUCCESS: successfully removed workflow!')
}
