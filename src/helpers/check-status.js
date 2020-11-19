module.exports = (errorMsg) => {
  return res => {
    if (res.ok) {
      return res
    } else {
      console.log(res.statusText)
      throw new Error(errorMsg)
    }
  }
}
