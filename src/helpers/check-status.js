module.exports = (errorMsg) => res => new Promise((resolve, reject) => {
  if (res.ok) {
    resolve(res)
  } else {
    console.log(res.statusText)
    reject(errorMsg)
  }
})
