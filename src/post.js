const { spawnSync } = require('child_process')
console.log('INFO: removing kaskadi-cli from repository...')
console.log('************ NPM ouput ************')
spawnSync('npm', ['rm', 'kaskadi-cli'], { stdio: 'inherit' })
console.log('************ End of NPM ouput ************')
console.log('SUCCESS: kaskadi-cli removed!')
console.log('INFO: removing init workflow from repository...')
spawnSync('git', ['rm', '.github/workflows/init.yml'], { stdio: 'inherit' })
console.log('SUCCESS: successfully removed workflow!')
