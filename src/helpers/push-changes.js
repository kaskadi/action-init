const addFlag = require('./add-flag.js')

module.exports = (spawnSync, test) => {
  console.log('INFO: commiting and pushing changes...')
  const gpgSign = spawnSync('git', ['config', 'commit.gpgSign']).stdout
  let commitParams = ['commit', '-am', 'Initialized repository with correct naming']
  commitParams = gpgSign.length > 0 ? addFlag(commitParams, '-S') : commitParams
  commitParams = test ? addFlag(commitParams, '--dry-run') : commitParams
  spawnSync('git', commitParams, { stdio: 'inherit' })
  let pushParams = ['push']
  pushParams = test ? addFlag(pushParams, '--dry-run') : pushParams
  spawnSync('git', pushParams, { stdio: 'inherit' })
  console.log('SUCCESS: commited and pushed changes!')
}
