module.exports = (spawnSync) => {
  console.log('INFO: removing init workflow from repository...')
  spawnSync('git', ['rm', '.github/workflows/init.yml'], { stdio: 'inherit' })
  console.log('SUCCESS: successfully removed workflow!')
}
