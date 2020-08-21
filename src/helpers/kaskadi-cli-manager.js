module.exports = {
  installCLI,
  removeCLI
}

function installCLI (spawnSync) {
  console.log('INFO: installing kaskadi-cli in repository...')
  console.log('************ NPM ouput ************')
  spawnSync('npm', ['i', 'kaskadi-cli'], { stdio: 'inherit' })
  console.log('************ End of NPM ouput ************')
  console.log('SUCCESS: kaskadi-cli installed!')
}

function removeCLI (spawnSync) {
  console.log('INFO: removing kaskadi-cli from repository...')
  console.log('************ NPM ouput ************')
  spawnSync('npm', ['rm', 'kaskadi-cli'], { stdio: 'inherit' })
  console.log('************ End of NPM ouput ************')
  console.log('SUCCESS: kaskadi-cli removed!')
}
