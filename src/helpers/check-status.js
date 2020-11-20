module.exports = (errorMsg, validityAnalyzer = res => res.ok) => res => new Promise((resolve, reject) => {
  if (validityAnalyzer(res)) {
    resolve(res)
  } else {
    const { status, statusText } = res
    console.log(`${status}: ${statusText}`)
    reject(errorMsg)
  }
})
