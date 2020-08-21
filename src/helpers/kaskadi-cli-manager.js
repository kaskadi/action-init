module.exports = (spawnSync, op) => {
  const header = `INFO: ${op === 'i' ? 'installing' : 'removing'} kaskadi-cli ${op === 'i' ? 'in' : 'from'} repository...`
  const footer = `SUCCESS: kaskadi-cli ${op === 'i' ? 'installed' : 'removed'}!`
  console.log(header)
  console.log('************ NPM ouput ************')
  spawnSync('npm', [op, 'kaskadi-cli'], { stdio: 'inherit' })
  console.log('************ End of NPM ouput ************')
  console.log(footer)
}
