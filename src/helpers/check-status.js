module.exports = (errorMsg, validityAnalyzer = res => res.ok) => res => new Promise((resolve, reject) => {
  if (validityAnalyzer(res)) {
    resolve(res)
  } else {
    console.log(res.statusText)
    reject(errorMsg)
  }
})
