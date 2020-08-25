const addFlag = require('./add-flag.js')

module.exports = (spawnSync, test) => {
  console.log('INFO: removing init workflow from repository...')
  let args = ['rm', '.github/workflows/init.yml']
  args = test ? addFlag(args, '--dry-run') : args
  spawnSync('git', args, { stdio: 'inherit' })
  console.log('SUCCESS: successfully removed workflow!')
}
