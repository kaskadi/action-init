module.exports = (spawnSync, repoType) => {
  console.log(`INFO: initializing repository as ${repoType} repository...`)
  spawnSync('node', ['node_modules/kaskadi-cli/kaskadi', 'init', repoType], { stdio: 'inherit' })
  if (repoType === 'element' || repoType === 'lambda') {
    const gitOp = require('./git-op.js')
    gitOp(spawnSync, 'add', ['*.js'])
  }
  console.log('SUCCESS: successfully initialized repository!')
}
