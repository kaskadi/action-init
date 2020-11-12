module.exports = (spawnSync) => {
  console.log('INFO: commiting and pushing changes...')
  const gpgSign = spawnSync('git', ['config', 'commit.gpgSign']).stdout
  let commitParams = ['commit', '-am', 'Initialized repository with correct naming']
  commitParams = gpgSign.length > 0 ? addFlag(commitParams, '-S') : commitParams
  spawnSync('git', commitParams, { stdio: 'inherit' })
  spawnSync('git', ['push'], { stdio: 'inherit' })
  console.log('SUCCESS: commited and pushed changes!')
}

function addFlag (args, flag) {
  return [...args.slice(0, 1), flag, ...args.slice(1)]
}
