const gitOp = require('./git-op.js')

module.exports = (spawnSync, repoType) => {
  console.log(`INFO: initializing repository as ${repoType} repository...`)
  spawnSync('node', ['node_modules/kaskadi-cli/kaskadi', 'init', repoType], { stdio: 'inherit' })
  gitOp(spawnSync, 'add', ['.'])
  console.log('SUCCESS: successfully initialized repository!')
}
