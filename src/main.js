const core = require('@actions/core')
const { spawnSync } = require('child_process')
const repoType = core.getInput('repoType')
console.log(`INFO: initializing repository as ${repoType} repository...`)
spawnSync('source', ['node_modules/.bin/kaskadi', 'init', repoType], { stdio: 'inherit' })
if (repoType === 'element' || repoType === 'lambda') {
  spawnSync('git', ['add', '*.js'], { stdio: 'inherit' })
}
console.log('SUCCESS: successfully initialized repository!')
console.log('INFO: commiting and pushing changes...')
const gpgSign = spawnSync('git', ['config', 'commit.gpgSign']).stdout
const commitParams = gpgSign.length > 0 ? ['commit', '-S', '-am', 'Initialized repository with correct naming'] : ['commit', '-am', 'Initialized repository with correct naming']
spawnSync('git', commitParams, { stdio: 'inherit' })
spawnSync('git', ['push'], { stdio: 'inherit' })
console.log('SUCCESS: commited and pushed changes!')
