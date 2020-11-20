module.exports = (errorMsg, validityAnalyzer = res => res.ok) => res => new Promise((resolve, reject) => {
  if (validityAnalyzer(res)) {
    resolve(res)
  } else {
    const { status, statusText } = res
    console.log(`Server response status is "${status}" with status text "${statusText}"`)
    reject(errorMsg)
  }
})
