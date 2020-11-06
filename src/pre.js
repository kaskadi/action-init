const { spawnSync } = require('child_process')
const path = require('path')

function installDependencies () {
  console.log('INFO: installing action dependencies...')
  spawnSync('npm', ['i', '--only=prod'])
  console.log('SUCCESS: dependencies installed!')
}

const actionRepo = path.join(__dirname, '..')
const callingRepo = process.cwd()
if (callingRepo !== actionRepo) {
  process.chdir(actionRepo)
  installDependencies()
  process.chdir(callingRepo)
} else {
  installDependencies()
}

// force
