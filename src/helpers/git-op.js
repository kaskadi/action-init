module.exports = (spawnSync, op, args = []) => {
  if (process.env.TEST_ENV) {
    args = ['--dry-run', ...args]
  }
  return spawnSync('git', [op, ...args], { stdio: 'inherit' })
}
