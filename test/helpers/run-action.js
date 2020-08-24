const { spawnSync } = require('child_process')

module.exports = (steps) => {
  for (const step of steps) {
    runStep(step)
  }
}

function runStep (step) {
  try {
    console.log(`INFO: running action ${step} step...`)
    console.log(`\n************ ${step.toUpperCase()} STEP OUTPUT START ************\n`)
    spawnSync('node', [`src/${step}`], { stdio: 'inherit' })
    console.log(`\n************ ${step.toUpperCase()} STEP ACTION OUTPUT END ************\n`)
  } catch (err) {
    console.log(`ERROR: an error occured in ${step} step...`)
    console.log(err)
    process.exit()
  }
}
