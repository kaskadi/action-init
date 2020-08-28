const { spawn } = require('child_process')
const path = require('path')

module.exports = async (steps) => {
  for (const step of steps) {
    await runStep(step).catch(() => {
      throw new Error('An error occured while running your action...')
    })
  }
}

function runStep (step) {
  return new Promise((resolve, reject) => {
    console.log(`\n************ running action ${step} step ************\n`)
    const proc = spawn('node', [path.join(__dirname, '../..', `src/${step}`)])
    proc.stdout.on('data', log)
    proc.stderr.on('data', log)
    proc.on('error', console.log)
    proc.on('exit', code => {
      if (code !== 0) {
        reject(new Error(code))
      }
      resolve(code)
    })
  })
}

function log (data) {
  console.log(data.toString().trim())
}
