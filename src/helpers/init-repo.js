module.exports = (spawnSync, repoType) => {
  console.log(`INFO: initializing repository as ${repoType} repository...`)
  spawnSync('source', ['node_modules/.bin/kaskadi', 'init', repoType], { stdio: 'inherit' })
  if (repoType === 'element' || repoType === 'lambda') {
    spawnSync('git', ['add', '*.js'], { stdio: 'inherit' })
  }
  console.log('SUCCESS: successfully initialized repository!')
}
