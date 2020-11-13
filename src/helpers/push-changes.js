const gitOp = require('./git-op.js')

module.exports = (spawnSync) => {
  console.log('INFO: commiting and pushing changes...')
  const gpgSign = spawnSync('git', ['config', 'commit.gpgSign']).stdout
  let commitParams = ['-am', 'Initialized repository with correct naming']
  if (gpgSign.length > 0) {
    commitParams = ['-S', ...commitParams]
  }
  gitOp(spawnSync, 'commit', commitParams)
  gitOp(spawnSync, 'push')
  console.log('SUCCESS: commited and pushed changes!')
}
