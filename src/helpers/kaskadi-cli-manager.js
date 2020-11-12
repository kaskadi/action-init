module.exports = (spawnSync, op) => {
  const header = `INFO: ${op === 'i' ? 'installing' : 'removing'} kaskadi-cli ${op === 'i' ? 'in' : 'from'} repository...`
  const footer = `SUCCESS: kaskadi-cli ${op === 'i' ? 'installed' : 'removed'}!`
  console.log(header)
  spawnSync('npm', [op, 'kaskadi-cli'])
  console.log(footer)
}
