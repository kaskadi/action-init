module.exports = (args, flag) => {
  return [...args.slice(0, 1), flag, ...args.slice(1)]
}
