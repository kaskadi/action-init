module.exports = spawnSync => {
  console.log('INFO: commiting and pushing changes...')
  const gpgSign = spawnSync('git', ['config', 'commit.gpgSign']).stdout
  const commitParams = gpgSign.length > 0 ? ['commit', '-S', '-am', 'Initialized repository with correct naming'] : ['commit', '-am', 'Initialized repository with correct naming']
  spawnSync('git', commitParams, { stdio: 'inherit' })
  spawnSync('git', ['push'], { stdio: 'inherit' })
  console.log('SUCCESS: commited and pushed changes!')
}
